import express from 'express';
import { newFormSubmit, formSubmit } from '../controllers';

const apiRouter = express.Router();

apiRouter.post('/:key', newFormSubmit);
apiRouter.post('/:key/:form', formSubmit);

export default apiRouter;
