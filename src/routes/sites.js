import express from 'express';
import { allSites, addSite } from '../controllers';
import { isAuthenticated } from '../middleware/passport';

const sitesRouter = express.Router();

sitesRouter.get('/sites', isAuthenticated, allSites);
sitesRouter.post('/sites', isAuthenticated, addSite);
export default sitesRouter;
