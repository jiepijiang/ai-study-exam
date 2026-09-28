import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_DB = {
  version: 1,
  users: [],
  sessions: [],
  checkins: [],
  exams: [],
  reviews: [],
  notes: []
};

export class JsonStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.db = structuredClone(DEFAULT_DB);
    this.writeChain = Promise.resolve();
  }

  async init() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      this.db = { ...structuredClone(DEFAULT_DB), ...JSON.parse(await fs.readFile(this.filePath, 'utf8')) };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await this.persist();
    }
  }

  async persist() {
    const content = JSON.stringify(this.db, null, 2);
    this.writeChain = this.writeChain.then(async () => {
      const tempPath = `${this.filePath}.tmp`;
      await fs.writeFile(tempPath, content, 'utf8');
      await fs.rename(tempPath, this.filePath);
    });
    return this.writeChain;
  }

  async update(mutator) {
    const result = await mutator(this.db);
    await this.persist();
    return result;
  }
}

export class PostgresStore {
  constructor(pool) {
    this.pool = pool;
    this.db = structuredClone(DEFAULT_DB);
    this.writeChain = Promise.resolve();
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS ai_study_state (
        id SMALLINT PRIMARY KEY CHECK (id = 1),
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await this.pool.query(
      'INSERT INTO ai_study_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING',
      [JSON.stringify(DEFAULT_DB)]
    );
    const result = await this.pool.query('SELECT data FROM ai_study_state WHERE id = 1');
    this.db = { ...structuredClone(DEFAULT_DB), ...(result.rows[0]?.data || {}) };
  }

  async persist() {
    const content = JSON.stringify(this.db);
    this.writeChain = this.writeChain.then(() => this.pool.query(
      'UPDATE ai_study_state SET data = $1::jsonb, updated_at = NOW() WHERE id = 1',
      [content]
    ));
    return this.writeChain;
  }

  async update(mutator) {
    const result = await mutator(this.db);
    await this.persist();
    return result;
  }

  async close() {
    await this.pool.end();
  }
}

export async function createStore(filePath) {
  if (!process.env.DATABASE_URL) return new JsonStore(filePath);
  const { Pool } = await import('pg');
  const ssl = process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false };
  return new PostgresStore(new Pool({ connectionString: process.env.DATABASE_URL, ssl }));
}

export { DEFAULT_DB };
