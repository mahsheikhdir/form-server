import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookieSession  from 'cookie-session';
import path from 'path';
import passport from 'passport';
import userRouter from './routes/user';
import projectRouter from './routes/projects';
import apiRouter from './routes/api';
import { passportInitialize } from './middleware';
import { sessionSecret } from './settings';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(cookieSession({
//   secret: sessionSecret,
//   resave: false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000}
// }));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

passportInitialize(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/build')));

const version = '/v1';

app.use(version, userRouter);
app.use(version, projectRouter);
app.use(version, apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
  next();
});

export default app;
