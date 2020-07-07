import { pool } from '../models/pool';
import {
  createUserTable,
  dropUserTable,
  createSitesTable,
  dropSitesTable,
} from './queries';

export const queryDatabase = async arr => {
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i]);
    const val = await pool.query(arr[i]);
  }
};

export const dropTables = () => queryDatabase([
  dropSitesTable,
  dropUserTable
]);
export const createTables = async () => queryDatabase([
  createUserTable,
  createSitesTable
]);
