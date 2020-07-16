import express from 'express';
import { allProjects, addProject, allProjectsInfo } from '../controllers';
import { isAuthenticated } from '../middleware/passport';
import cors from 'cors';

const projectRouter = express.Router();

projectRouter.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}));

projectRouter.get('/projects', isAuthenticated, allProjectsInfo);
projectRouter.post('/projects', isAuthenticated, addProject);
export default projectRouter;
