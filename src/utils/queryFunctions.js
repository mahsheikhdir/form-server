import { pool } from '../models/pool';
import {
  dropUserTable,
  createSitesTable,
  dropProjectTable,
  createProjectTable,
  createUserTable,
} from './queries';

export const queryDatabase = async arr => {
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i]);
    const val = await pool.query(arr[i]);
  }
};

export const dropTables = () => queryDatabase([
  dropProjectTable,
  dropUserTable
]);
export const createTables = async () => queryDatabase([
  createUserTable,
  createProjectTable,
]);
