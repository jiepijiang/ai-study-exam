import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../..');
const bank = JSON.parse(fs.readFileSync(path.join(repoRoot, 'question-bank.json'), 'utf8'));
const dailyPlan = JSON.parse(fs.readFileSync(path.join(repoRoot, 'daily-plan.json'), 'utf8'));
const questions = new Map(bank.questions.filter((item) => item.enabled !== false && item.active !== false).map((item) => [item.id, item]));
const plan = Object.values(dailyPlan).sort((a, b) => a.date.localeCompare(b.date));

export function getQuestion(id) {
  return questions.get(id);
}

export function getQuestions(ids) {
  return ids.map((id) => questions.get(id)).filter(Boolean);
}

export function publicQuestion(question) {
  if (!question) return null;
  const publicKeys = [
    'id', 'week', 'week_title', 'skill_id', 'skill_ids', 'skill_name',
    'level', 'type', 'q', 'stem', 'options', 'source', 'source_type',
    'source_ref', 'review_intervals_days', 'version', 'minutes'
  ];
  return Object.fromEntries(publicKeys.filter((key) => question[key] !== undefined).map((key) => [key, question[key]]));
}

export function publicQuestions(items) {
  return items.map(publicQuestion);
}

export function getPlanEntry(date) {
  return plan.find((item) => item.date === date);
}

export function getTodayPlan() {
  const today = new Date().toISOString().slice(0, 10);
  return getPlanEntry(today) || plan.find((item) => item.date >= today) || plan[plan.length - 1];
}

export function getWeek(weekNumber) {
  return bank.weeks.find((item) => Number(item.week) === Number(weekNumber));
}

export function getWeekQuestions(weekNumber) {
  const week = getWeek(weekNumber);
  return week ? getQuestions(week.question_ids || week.questions?.map((item) => item.id) || []) : [];
}

export function questionCount() {
  return questions.size;
}

export function contentSummary() {
  return {
    version: bank.version,
    bankVersion: bank.bankVersion,
    updated: bank.updated,
    passLine: bank.passLine,
    weeks: bank.weeks.map(({ questions: embedded, ...week }) => ({ ...week, questionCount: (week.question_ids || embedded?.map((item) => item.id) || []).length })),
    skills: bank.skills,
    skillMilestones: bank.skillMilestones,
    evidenceLevels: bank.evidenceLevels,
    gates: bank.gates,
    reviewIntervalsDays: bank.reviewIntervalsDays,
    reviewWeights: bank.reviewWeights,
    masteryFormula: bank.masteryFormula
  };
}

export function getPlan() {
  return plan;
}

export function getBank() {
  return bank;
}
