import dotenv from 'dotenv';

dotenv.config();
export const connectionString = process.env.CONNECTION_STRING;
export const sessionSecret = process.env.SESSION_SECRET;
