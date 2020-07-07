import express from 'express';
import passport from 'passport';
import {
  allUsers, registerNewUser, protectedRoute
} from '../controllers';
import { isAuthenticated } from '../middleware/passport';

const userRouter = express.Router();

userRouter.get('/users', allUsers);
userRouter.post('/register', registerNewUser);
userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send({ loggedInUser: req.user });
});

userRouter.get('/dashboard', isAuthenticated, protectedRoute);
export default userRouter;
