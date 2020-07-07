import pgp from 'pg-promise';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

let p =  pgp({
    query(e) {
        console.log(e.query);
    }
});

export const pool = p(connectionString);
