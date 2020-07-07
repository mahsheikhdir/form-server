export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message')
`;

export const dropMessagesTable = 'DROP TABLE messages;';

export const createUserTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
  )
`;

export const dropUserTable = 'DROP TABLE users;';

export const createProjectTable = `
DROP TABLE IF EXISTS project;
CREATE TABLE IF NOT EXISTS project (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  api_key VARCHAR NOT NULL,
  user_id INTEGER REFERENCES users(id),
  form_data JSONB NOT NULL DEFAULT '{"default":[]}'::jsonb
  )
`;

export const dropProjectTable = 'DROP TABLE project;';
