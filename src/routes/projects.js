import express from 'express';
import { allProjects, addProject } from '../controllers';
import { isAuthenticated } from '../middleware/passport';

const projectRouter = express.Router();

projectRouter.get('/projects', isAuthenticated, allProjects);
projectRouter.post('/projects', isAuthenticated, addProject);
export default projectRouter;
