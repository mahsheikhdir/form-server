import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import Model from '../models/model';

const LocalStrategy = passportLocal.Strategy;
const userModel = new Model('users');

export const passportInitialize = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Authenticating user...', username, password);
      userModel.select('*', `WHERE username = '${username}'`).then((result) => {
        if (result.rows.length > 0) {
          const user = result.rows[0];
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
    userModel.select('*', `WHERE id = ${id}`).then((result) => {
      return done(null, result.rows[0]);
    });
  });
};
