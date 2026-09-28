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

export { DEFAULT_DB };
