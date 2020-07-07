import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import Model from '../models/model';

const LocalStrategy = passportLocal.Strategy;
const userModel = new Model('users');

export const passportInitialize = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      userModel.select('*', `WHERE username = '${username}'`).then((result) => {
        if (result.length > 0) {
          const user = result[0];
          console.log(user);

          bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
              console.log(err);
            }
            if (match) {
              return done(null, user);
            }
            return done(null, false, { message: 'Password is incorrect' });
          });
        } else {
          return done(null, false, {
            message: 'No user with that username'
          });
        }
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userModel.select('*', `WHERE id = ${id}`).then((result) => done(null, result[0]));
  });
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(403).send({ message: 'Not authenticated' });
  }
};
