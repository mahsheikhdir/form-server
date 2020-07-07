import express from 'express';
import { formSubmit } from '../controllers';

const apiRouter = express.Router();

apiRouter.post('/:key', formSubmit);
apiRouter.post('/:key/:form', formSubmit);

export default apiRouter;
