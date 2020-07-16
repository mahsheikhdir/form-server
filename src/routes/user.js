import express from 'express';
import passport from 'passport';
import {
  allUsers, registerNewUser, protectedRoute, loggedIn
} from '../controllers';
import { isAuthenticated } from '../middleware/passport';
import cors from 'cors';

const userRouter = express.Router();

userRouter.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}));

userRouter.get('/users', allUsers);
userRouter.post('/register', registerNewUser);
userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send({ loggedInUser: req.user });
});

userRouter.get('/logout', function(req, res, next) {
  req.logout();
  res.status(200).send({ message: 'logged out'});
})

userRouter.get('/loggedIn', isAuthenticated, loggedIn);
userRouter.get('/dashboard', isAuthenticated, protectedRoute);
export default userRouter;
