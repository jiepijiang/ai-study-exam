import http from 'node:http';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { createStore } from './store.mjs';
import { clearSessionCookie, createSession, hashPassword, normalizeIdentity, readCookies, SESSION_COOKIE, sessionHash, setSessionCookie, validatePassword, verifyPassword } from './auth.mjs';
import { contentSummary, getBank, getPlan, getPlanEntry, getQuestion, getQuestions, getTodayPlan, getWeek, getWeekQuestions, publicQuestion, publicQuestions, questionCount } from './content.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const dataDir = process.env.DATA_DIR || path.resolve(here, '../data');
const store = await createStore(path.join(dataDir, 'db.json'));
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const allowedMethods = new Set(['GET', 'POST', 'OPTIONS']);

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...jsonHeaders, ...headers });
  res.end(body === undefined ? '' : JSON.stringify(body));
}

function fail(res, status, code, message, details) {
  send(res, status, { error: { code, message, ...(details ? { details } : {}) } });
}

function ok(res, data, status = 200, headers = {}) {
  send(res, status, data, headers);
}

function id(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function now() {
  return new Date().toISOString();
}

function parseQuery(url) {
  return Object.fromEntries(new URL(url, 'http://localhost').searchParams.entries());
}

async function body(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 1024 * 1024) throw Object.assign(new Error('请求体过大'), { status: 413, code: 'PAYLOAD_TOO_LARGE' });
  }
  if (!text) return {};
  try { return JSON.parse(text); } catch { throw Object.assign(new Error('请求体必须是合法 JSON'), { status: 400, code: 'INVALID_JSON' }); }
}

function publicUser(user) {
  return { id: user.id, username: user.username, email: user.email, theme: user.theme, createdAt: user.createdAt };
}

function currentUser(req) {
  const token = readCookies(req.headers.cookie || '')[SESSION_COOKIE];
  if (!token) return null;
  const session = store.db.sessions.find((item) => item.tokenHash === sessionHash(token) && item.expiresAt > now());
  return session ? store.db.users.find((user) => user.id === session.userId) || null : null;
}

function requireUser(req, res) {
  const user = currentUser(req);
  if (!user) {
    fail(res, 401, 'AUTH_REQUIRED', '请先登录');
    return null;
  }
  return user;
}

function userCheckins(userId) {
  return store.db.checkins.filter((item) => item.userId === userId);
}

function safeTask(task) {
  const { output, ...rest } = task;
  return rest;
}

function planForUser(userId, query = {}) {
  const checkins = userCheckins(userId);
  let entries = getPlan();
  if (query.week) entries = entries.filter((item) => Number(item.week) === Number(query.week));
  if (query.date) entries = entries.filter((item) => item.date === query.date);
  return entries.map((entry) => ({
    ...entry,
    tasks: entry.tasks.map((task) => {
      const state = checkins.find((item) => item.date === entry.date && item.taskId === task.taskId);
      return { ...safeTask(task), status: state?.status || 'TODO', checkedAt: state?.updatedAt || null, evidence: state?.evidence || null };
    }),
    completedTasks: entry.tasks.filter((task) => checkins.some((item) => item.date === entry.date && item.taskId === task.taskId && item.status === 'DONE')).length
  }));
}

function reviewView(item) {
  const question = getQuestion(item.questionId);
  return { ...item, question: publicQuestion(question) };
}

function compareAnswer(question, answer) {
  if (!question || question.type === 'code' || question.type === 'scenario') return { correct: false, manualReviewRequired: true };
  const expected = Array.isArray(question.answer) ? question.answer.map(Number).sort((a, b) => a - b) : [];
  const actual = Array.isArray(answer) ? answer.map(Number).sort((a, b) => a - b) : [Number(answer)].filter(Number.isFinite);
  return { correct: expected.length === actual.length && expected.every((value, index) => value === actual[index]), manualReviewRequired: false };
}

function nextReviewAt(stage) {
  const days = getBank().reviewIntervalsDays?.[stage] ?? 21;
  return new Date(Date.now() + days * 86400000).toISOString();
}

function examView(exam) {
  return {
    id: exam.id, mode: exam.mode, week: exam.week, status: exam.status, startedAt: exam.startedAt, submittedAt: exam.submittedAt || null,
    score: exam.score ?? null, total: exam.total, passLine: exam.passLine, passed: exam.passed ?? null,
    manualReviewRequired: exam.manualReviewRequired || false,
    questions: publicQuestions(getQuestions(exam.questionIds)),
    answers: exam.status === 'submitted' ? exam.answers : undefined
  };
}

async function route(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;
  const method = req.method;
  if (!allowedMethods.has(method)) return fail(res, 405, 'METHOD_NOT_ALLOWED', '不支持该 HTTP 方法');
  if (method === 'OPTIONS') return send(res, 204, undefined, { 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Credentials': 'true' });
  if (method === 'GET' && pathname === '/healthz') return ok(res, { ok: true, storage: process.env.DATABASE_URL ? 'postgres' : 'json' });
  if (!pathname.startsWith('/api/')) return serveStatic(req, res, pathname);

  const query = parseQuery(req.url);
  let input = {};
  if (method === 'POST') input = await body(req);
  const user = currentUser(req);

  if (method === 'POST' && pathname === '/api/auth/register') {
    const username = String(input.username || '').trim();
    const email = normalizeIdentity(input.email);
    const passwordError = validatePassword(input.password);
    if (!/^[\u4e00-\u9fa5A-Za-z0-9_-]{2,32}$/.test(username)) return fail(res, 400, 'INVALID_USERNAME', '用户名需为 2-32 位中文、字母、数字、下划线或短横线');
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail(res, 400, 'INVALID_EMAIL', '请输入有效邮箱');
    if (passwordError) return fail(res, 400, 'INVALID_PASSWORD', passwordError);
    if (store.db.users.some((item) => item.email === email || item.username.toLowerCase() === username.toLowerCase())) return fail(res, 409, 'IDENTITY_EXISTS', '用户名或邮箱已注册');
    const newUser = { id: id('usr'), username, email, passwordHash: await hashPassword(input.password), theme: 'system', createdAt: now() };
    const session = createSession(newUser.id);
    await store.update((db) => { db.users.push(newUser); db.sessions.push({ ...session, token: undefined }); });
    return ok(res, { user: publicUser(newUser) }, 201, { 'Set-Cookie': setSessionCookie(session.token) });
  }

  if (method === 'POST' && pathname === '/api/auth/login') {
    const identity = normalizeIdentity(input.identity || input.email || input.username);
    const found = store.db.users.find((item) => item.email === identity || item.username.toLowerCase() === identity);
    if (!found || !(await verifyPassword(input.password, found.passwordHash))) return fail(res, 401, 'INVALID_CREDENTIALS', '用户名或密码错误');
    const session = createSession(found.id);
    await store.update((db) => db.sessions.push({ ...session, token: undefined }));
    return ok(res, { user: publicUser(found) }, 200, { 'Set-Cookie': setSessionCookie(session.token) });
  }

  if (method === 'POST' && pathname === '/api/auth/logout') {
    const token = readCookies(req.headers.cookie || '')[SESSION_COOKIE];
    if (token) await store.update((db) => { db.sessions = db.sessions.filter((item) => item.tokenHash !== sessionHash(token)); });
    return ok(res, { ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
  }

  if (method === 'GET' && pathname === '/api/auth/me') return ok(res, { user: user ? publicUser(user) : null });
  if (!user) return fail(res, 401, 'AUTH_REQUIRED', '请先登录');

  if (method === 'GET' && pathname === '/api/dashboard') {
    const exams = store.db.exams.filter((item) => item.userId === user.id && item.status === 'submitted');
    const formalExams = exams.filter((item) => item.mode !== 'practice');
    const checkins = userCheckins(user.id);
    const reviews = store.db.reviews.filter((item) => item.userId === user.id && item.nextReviewAt <= now());
    const today = getTodayPlan();
    return ok(res, { user: publicUser(user), today: planForUser(user.id, { date: today.date })[0] || null, summary: { planDays: getPlan().length, checkedTasks: checkins.filter((item) => item.status === 'DONE').length, exams: formalExams.length, practiceExams: exams.length - formalExams.length, averageScore: formalExams.length ? Math.round(formalExams.reduce((sum, item) => sum + item.score, 0) / formalExams.length) : 0, dueReviews: reviews.length, questionCount: questionCount() }, recentExams: exams.slice(-5).reverse().map(examView) });
  }

  if (method === 'GET' && pathname === '/api/sprint') return ok(res, { items: planForUser(user.id, query), total: getPlan().length });
  if (method === 'GET' && pathname === '/api/questions') {
    let items = getQuestions(query.ids ? query.ids.split(',') : getBank().questions.map((item) => item.id));
    if (query.week) items = items.filter((item) => Number(item.week) === Number(query.week));
    if (query.skill) items = items.filter((item) => item.skill_ids?.includes(query.skill) || item.skill_id === query.skill);
    if (query.type) items = items.filter((item) => item.type === query.type);
    const offset = Math.max(0, Number(query.offset || 0));
    const limit = Math.min(100, Math.max(1, Number(query.limit || 100)));
    return ok(res, { items: publicQuestions(items.slice(offset, offset + limit)), total: items.length, offset, limit });
  }
  if (method === 'GET' && pathname === '/api/knowledge') return ok(res, contentSummary());
  if (method === 'GET' && pathname === '/api/essays') return ok(res, { items: publicQuestions(getBank().questions.filter((item) => item.type === 'code' || item.type === 'scenario')), total: getBank().questions.filter((item) => item.type === 'code' || item.type === 'scenario').length });
  if (method === 'GET' && pathname === '/api/exams') return ok(res, { items: store.db.exams.filter((item) => item.userId === user.id).slice().reverse().map(examView) });
  if (method === 'GET' && pathname === '/api/reviews') {
    const dueOnly = query.due !== 'false';
    const items = store.db.reviews.filter((item) => item.userId === user.id && (!dueOnly || item.nextReviewAt <= now())).sort((a, b) => a.nextReviewAt.localeCompare(b.nextReviewAt));
    return ok(res, { items: items.map(reviewView), total: items.length });
  }
  if (method === 'GET' && pathname === '/api/report') {
    const allExams = store.db.exams.filter((item) => item.userId === user.id && item.status === 'submitted');
    const exams = allExams.filter((item) => item.mode !== 'practice');
    const practiceExams = allExams.filter((item) => item.mode === 'practice');
    const checkins = userCheckins(user.id);
    const bySkill = {};
    for (const exam of exams) for (const result of exam.results || []) { const q = getQuestion(result.questionId); for (const skill of q?.skill_ids || []) { bySkill[skill] ||= { skill, name: getBank().skills[skill], attempts: 0, correct: 0 }; bySkill[skill].attempts++; if (result.correct) bySkill[skill].correct++; } }
    return ok(res, { user: publicUser(user), exams: exams.map(examView), practiceExams: practiceExams.map(examView), checkins: { total: checkins.length, done: checkins.filter((item) => item.status === 'DONE').length }, bySkill: Object.values(bySkill).map((item) => ({ ...item, accuracy: item.attempts ? Math.round(item.correct / item.attempts * 100) : 0 })) });
  }

  if (method === 'POST' && pathname === '/api/checkins') {
    const entry = getPlanEntry(input.date);
    if (!entry) return fail(res, 400, 'INVALID_DATE', '该日期不在学习计划中');
    const task = entry.tasks.find((item) => item.taskId === input.taskId);
    if (!task) return fail(res, 400, 'INVALID_TASK', '该任务不存在');
    const status = String(input.status || 'DONE');
    if (!getBank().states.includes(status) && status !== 'TODO') return fail(res, 400, 'INVALID_STATUS', '无效的打卡状态');
    const evidence = String(input.evidence || '').trim().slice(0, 2000);
    if (status === 'DONE' && evidence.length < 8) return fail(res, 400, 'INVALID_EVIDENCE', '完成任务必须填写至少 8 个字符的可复核证据');
    const record = { id: id('chk'), userId: user.id, date: entry.date, taskId: task.taskId, status, evidence: evidence || null, updatedAt: now() };
    await store.update((db) => { const index = db.checkins.findIndex((item) => item.userId === user.id && item.date === entry.date && item.taskId === task.taskId); if (index >= 0) db.checkins[index] = { ...db.checkins[index], ...record }; else db.checkins.push(record); });
    return ok(res, { checkin: record }, 201);
  }

  if (method === 'POST' && pathname === '/api/exams/start') {
    const mode = input.mode === 'practice' ? 'practice' : 'weekly';
    const week = Number(input.week || getTodayPlan().week || 1);
    const requestedIds = Array.isArray(input.questionIds) ? input.questionIds : [];
    const source = mode === 'practice' && requestedIds.length ? getQuestions(requestedIds) : getWeekQuestions(week);
    if (!source.length) return fail(res, 400, 'NO_QUESTIONS', '没有可用题目');
    const selected = mode === 'practice' && input.limit ? source.slice(0, Math.min(20, Number(input.limit))) : source;
    const exam = { id: id('exam'), userId: user.id, mode, week, questionIds: selected.map((item) => item.id), answers: {}, results: [], status: 'active', startedAt: now(), total: selected.length, passLine: getBank().passLine };
    await store.update((db) => db.exams.push(exam));
    return ok(res, examView(exam), 201);
  }

  const submitMatch = pathname.match(/^\/api\/exams\/([^/]+)\/submit$/);
  if (method === 'POST' && submitMatch) {
    const exam = store.db.exams.find((item) => item.id === submitMatch[1] && item.userId === user.id);
    if (!exam) return fail(res, 404, 'EXAM_NOT_FOUND', '考试不存在');
    if (exam.status === 'submitted') return ok(res, examView(exam));
    const answers = input.answers && typeof input.answers === 'object' ? input.answers : {};
    const results = exam.questionIds.map((questionId) => { const result = compareAnswer(getQuestion(questionId), answers[questionId]); return { questionId, answer: answers[questionId] ?? null, ...result }; });
    const objective = results.filter((item) => !item.manualReviewRequired);
    const score = exam.total ? Math.round(results.filter((item) => item.correct).length / exam.total * 100) : 0;
    exam.answers = answers;
    exam.results = results;
    exam.score = score;
    exam.status = 'submitted';
    exam.submittedAt = now();
    exam.manualReviewRequired = results.some((item) => item.manualReviewRequired);
    exam.passed = !exam.manualReviewRequired && score >= exam.passLine;
    if (exam.mode !== 'practice') {
      await store.update((db) => {
        for (const result of results) {
          const existing = db.reviews.find((item) => item.userId === user.id && item.questionId === result.questionId);
          const review = { id: existing?.id || id('rev'), userId: user.id, questionId: result.questionId, sourceExamId: exam.id, stage: result.correct ? Math.min((existing?.stage ?? 0) + 1, 3) : 0, nextReviewAt: nextReviewAt(result.correct ? Math.min((existing?.stage ?? 0) + 1, 3) : 0), lastCorrect: result.correct, updatedAt: now() };
          if (existing) Object.assign(existing, review); else db.reviews.push(review);
        }
      });
    }
    return ok(res, { ...examView(exam), objectiveQuestions: objective.length, correct: results.filter((item) => item.correct).length });
  }

  const reviewMatch = pathname.match(/^\/api\/reviews\/([^/]+)\/answer$/);
  if (method === 'POST' && reviewMatch) {
    const review = store.db.reviews.find((item) => item.id === reviewMatch[1] && item.userId === user.id);
    if (!review) return fail(res, 404, 'REVIEW_NOT_FOUND', '复习记录不存在');
    const result = compareAnswer(getQuestion(review.questionId), input.answer);
    review.lastCorrect = result.correct;
    review.stage = result.correct ? Math.min(review.stage + 1, 3) : 0;
    review.nextReviewAt = nextReviewAt(review.stage);
    review.updatedAt = now();
    await store.persist();
    return ok(res, { ...reviewView(review), correct: result.correct, manualReviewRequired: result.manualReviewRequired });
  }

  if (method === 'POST' && pathname === '/api/profile/theme') {
    if (!['light', 'dark', 'system'].includes(input.theme)) return fail(res, 400, 'INVALID_THEME', '主题只能是 light、dark 或 system');
    user.theme = input.theme;
    await store.persist();
    return ok(res, { user: publicUser(user) });
  }

  if (method === 'GET' && pathname === '/api/notes') {
    return ok(res, { items: store.db.notes.filter((item) => item.userId === user.id).slice().reverse() });
  }

  if (method === 'POST' && pathname === '/api/notes') {
    const note = { id: id('note'), userId: user.id, title: String(input.title || '').slice(0, 120), content: String(input.content || '').slice(0, 10000), questionId: input.questionId || null, createdAt: now(), updatedAt: now() };
    if (!note.content.trim()) return fail(res, 400, 'EMPTY_NOTE', '笔记内容不能为空');
    await store.update((db) => db.notes.push(note));
    return ok(res, { note }, 201);
  }

  return fail(res, 404, 'NOT_FOUND', '接口不存在');
}

async function serveStatic(req, res, pathname) {
  const publicDir = path.resolve(here, '../public');
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(publicDir, requested);
  if (filePath !== publicDir && !filePath.startsWith(`${publicDir}${path.sep}`)) return fail(res, 400, 'INVALID_PATH', '非法路径');
  try {
    const data = await fs.readFile(filePath);
    const contentType = filePath.endsWith('.html') ? 'text/html; charset=utf-8'
      : filePath.endsWith('.js') ? 'text/javascript; charset=utf-8'
        : filePath.endsWith('.css') ? 'text/css; charset=utf-8'
          : filePath.endsWith('.svg') ? 'image/svg+xml'
            : filePath.endsWith('.json') ? 'application/json; charset=utf-8'
              : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch { fail(res, 404, 'NOT_FOUND', '资源不存在'); }
}

await store.init();
const server = http.createServer(async (req, res) => {
  const origin = process.env.CORS_ORIGIN;
  if (origin && req.headers.origin === origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  try { await route(req, res); } catch (error) { console.error(error); fail(res, error.status || 500, error.code || 'INTERNAL_ERROR', error.status ? error.message : '服务器内部错误'); }
});
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => console.log(`AI study API listening on http://${host}:${port}`));
