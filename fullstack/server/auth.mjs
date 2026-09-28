import crypto from 'node:crypto';

export const SESSION_COOKIE = 'ai_study_sid';
const SESSION_DAYS = 7;

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function normalizeIdentity(value) {
  return String(value || '').trim().toLowerCase();
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return '密码长度必须为 8-128 位';
  }
  return null;
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (error, key) => error ? reject(error) : resolve(key)));
  return `scrypt$${salt}$${derived.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  const [, salt, expected] = String(stored).split('$');
  if (!salt || !expected) return false;
  const actual = await new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (error, key) => error ? reject(error) : resolve(key)));
  return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), actual);
}

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  return {
    token,
    tokenHash: hash(token),
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_DAYS * 86400000).toISOString()
  };
}

export function readCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part) => part.trim().split('=')) .filter(([key, value]) => key && value).map(([key, ...value]) => [key, value.join('=')]));
}

export function sessionHash(token) {
  return hash(token);
}

export function setSessionCookie(token) {
  const secure = process.env.COOKIE_SECURE === 'true' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.COOKIE_SECURE === 'true' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
