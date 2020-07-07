import { pool } from '../models/pool';
import {
  createUserTable,
  dropUserTable,
  createSitesTable,
  dropSitesTable,
} from './queries';

export const queryDatabase = async arr => {
  const queries = [];
  arr.forEach((query) => {
    queries.push(pool.query(query));
  });

  return Promise.all([ queries ]);
};

export const queryDatabase2 = async arr => new Promise((resolve) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    const val = pool.query(arr[i]);
    console.log(val);
  }
  resolve('Queried Database');
});

export const dropTables = () => queryDatabase2([
  dropSitesTable,
  dropUserTable
]);
export const createTables = async () => queryDatabase2([
  createUserTable,
  createSitesTable
]);
