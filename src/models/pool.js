import pgp from 'pg-promise';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

const db = pgp({
  query(e) {
    //console.log(e.query);
  }
});

export const pool = db(connectionString);
