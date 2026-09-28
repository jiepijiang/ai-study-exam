import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const externalBaseUrl = process.env.SMOKE_BASE_URL;
const port = Number(process.env.PORT || 19000 + Math.floor(Math.random() * 1000));
const dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-study-smoke-'));
const baseUrl = externalBaseUrl || `http://127.0.0.1:${port}`;
const server = externalBaseUrl ? null : spawn(process.execPath, ['server/index.mjs'], {
  cwd: root,
  env: { ...process.env, PORT: String(port), DATA_DIR: dataDir },
  stdio: ['ignore', 'pipe', 'pipe']
});

let output = '';
if (server) {
  server.stdout.on('data', (chunk) => { output += chunk.toString(); });
  server.stderr.on('data', (chunk) => { output += chunk.toString(); });
}

async function waitForServer() {
  if (externalBaseUrl) return;
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try { if ((await fetch(`http://127.0.0.1:${port}/api/auth/me`)).ok) return; } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`服务启动超时：${output}`);
}

function cookieFrom(response) {
  const value = response.headers.get('set-cookie') || '';
  return value.split(';', 1)[0];
}

async function request(pathname, options = {}, cookie = '') {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}), ...(options.headers || {}) };
  const response = await fetch(`${baseUrl}${pathname}`, { ...options, headers });
  const data = await response.json();
  return { response, data, cookie: cookieFrom(response) || cookie };
}

function json(method, value) {
  return { method, body: JSON.stringify(value) };
}

try {
  await waitForServer();

  let result = await request('/api/auth/register', json('POST', { username: 'smoke-alice', email: 'alice@example.com', password: 'correct horse battery' }));
  assert.equal(result.response.status, 201);
  const aliceCookie = result.cookie;
  assert.match(aliceCookie, /^ai_study_sid=/);

  result = await request('/api/auth/me', {}, aliceCookie);
  assert.equal(result.data.user.username, 'smoke-alice');

  result = await request('/api/sprint?week=1', {}, aliceCookie);
  assert.equal(result.response.status, 200);
  assert.ok(result.data.items.length > 0);
  const firstDay = result.data.items[0];
  const firstTask = firstDay.tasks[0];

  result = await request('/api/checkins', { ...json('POST', { date: firstDay.date, taskId: firstTask.taskId, status: 'DONE', evidence: '' }) }, aliceCookie);
  assert.equal(result.response.status, 400);

  result = await request('/api/questions?week=1&limit=1', {}, aliceCookie);
  assert.equal(result.response.status, 200);
  assert.ok(result.data.items[0].id);
  assert.equal('answer' in result.data.items[0], false);
  assert.equal('explain' in result.data.items[0], false);

  result = await request('/api/checkins', { ...json('POST', { date: firstDay.date, taskId: firstTask.taskId, status: 'DONE', evidence: 'smoke-test' }) }, aliceCookie);
  assert.equal(result.response.status, 201);

  result = await request('/api/exams/start', { ...json('POST', { mode: 'weekly', week: 1 }) }, aliceCookie);
  assert.equal(result.response.status, 201);
  const examId = result.data.id;
  assert.ok(result.data.questions.length > 0);
  assert.equal('answer' in result.data.questions[0], false);

  result = await request(`/api/exams/${examId}/submit`, { ...json('POST', { answers: {} }) }, aliceCookie);
  assert.equal(result.response.status, 200);
  assert.equal(result.data.status, 'submitted');

  result = await request('/api/reviews?due=false', {}, aliceCookie);
  const formalReviewCount = result.data.items.length;
  const practiceQuestionId = firstDay.tasks[0].questionId || (await request('/api/questions?week=1&limit=1', {}, aliceCookie)).data.items[0].id;
  result = await request('/api/exams/start', { ...json('POST', { mode: 'practice', week: 1, questionIds: [practiceQuestionId], limit: 1 }) }, aliceCookie);
  assert.equal(result.response.status, 201);
  const practiceExamId = result.data.id;
  result = await request(`/api/exams/${practiceExamId}/submit`, { ...json('POST', { answers: {} }) }, aliceCookie);
  assert.equal(result.response.status, 200);
  result = await request('/api/reviews?due=false', {}, aliceCookie);
  assert.equal(result.data.items.length, formalReviewCount);

  const otherWeek = (await request('/api/questions?week=2&limit=1', {}, aliceCookie)).data.items[0];
  result = await request('/api/exams/start', { ...json('POST', { mode: 'weekly', week: 1, questionIds: [otherWeek.id] }) }, aliceCookie);
  assert.equal(result.response.status, 201);
  assert.ok(result.data.questions.every((question) => Number(question.week) === 1));

  result = await request('/api/report', {}, aliceCookie);
  assert.equal(result.data.exams.length, 1);
  assert.equal(result.data.practiceExams.length, 1);
  assert.equal(result.data.checkins.done, 1);

  result = await request('/api/notes', { ...json('POST', { title: 'Smoke note', content: '服务端笔记隔离验证' }) }, aliceCookie);
  assert.equal(result.response.status, 201);
  result = await request('/api/notes', {}, aliceCookie);
  assert.equal(result.data.items.length, 1);

  result = await request('/api/auth/register', json('POST', { username: 'smoke-bob', email: 'bob@example.com', password: 'correct horse battery' }));
  assert.equal(result.response.status, 201);
  const bobCookie = result.cookie;
  result = await request('/api/report', {}, bobCookie);
  assert.equal(result.data.exams.length, 0);
  assert.equal(result.data.checkins.done, 0);
  result = await request('/api/exams', {}, bobCookie);
  assert.equal(result.data.items.length, 0);
  result = await request('/api/notes', {}, bobCookie);
  assert.equal(result.data.items.length, 0);

  result = await request('/api/auth/logout', { method: 'POST' }, bobCookie);
  assert.equal(result.response.status, 200);
  result = await request('/api/dashboard', {}, bobCookie);
  assert.equal(result.response.status, 401);

  console.log('SMOKE PASS: register, login session, sprint, question redaction, check-in, exam, report, isolation, logout');
} finally {
  if (server) server.kill();
  if (!externalBaseUrl) await fs.rm(dataDir, { recursive: true, force: true });
}
