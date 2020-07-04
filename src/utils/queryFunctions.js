import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
  createUserTable,
  dropUserTable,
} from './queries';

export const queryDatabase = async arr => {
  const queries = [];
  arr.forEach((query) => {
    queries.push(pool.query(query));
  });

  return Promise.all([ queries ]);
};

export const dropTables = () => queryDatabase([ dropUserTable ]);
export const createTables = async () => queryDatabase([ createUserTable ]);
