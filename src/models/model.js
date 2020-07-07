import { pool } from './pool';
import { Logger } from '../utils/logger';
import { queryDatabase } from '../utils/queryFunctions';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += ` ${clause}`;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }
}

export default Model;
