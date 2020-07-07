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
    Logger(query);
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    Logger(query);
    return this.pool.query(query);
  }

  async appendJSON(id, data, form) {
    let field = 'default';
    if (form) field = form;

    const append = `
    UPDATE sites
    SET form_data = (
      CASE
      WHEN form_data ->$<field> IS NOT NULL
      THEN jsonb_set(form_data::jsonb, array[$<field>], (form_data->$<field>)::jsonb || $<data>::JSONB)
      WHEN form_data ->$<field> IS NULL
      THEN jsonb_insert(form_data, '{$<rawField>}', $<dataArray>::jsonb)
      END)
    WHERE id = $<id>
    RETURNING id, form_data->$<field>;
    `;
    const values = {
      field,
      rawField: {
        toPostgres: (a) => field,
        rawType: true,
      },
      data: JSON.stringify(data),
      dataArray: JSON.stringify([ data ]),
      id,
    };
    return this.pool.query(append, values);
  }
}

export default Model;
