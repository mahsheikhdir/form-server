import express from 'express';
import passport from 'passport';
import {
  indexPage, messagesPage, addMessage, allUsers, registerNewUser
} from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';
import { NotExtended } from 'http-errors';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);

indexRouter.get('/users', allUsers);
indexRouter.post('/register', registerNewUser);
indexRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send({loggedInUser: req.user});
  
})

export default indexRouter;
