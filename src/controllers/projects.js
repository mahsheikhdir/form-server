import crypto from 'crypto';
import Model from '../models/model';

const sitesModel = new Model('project');

export const allProjects = async (req, res) => {
  try {
    const data = await sitesModel.select('*', `WHERE user_id = ${req.user.id}`);
    res.status(200).send({ projects: data });
  } catch (error) {
    res.status(500).send({ message: error.stack });
  }
};

export const addProject = async (req, res) => {
  const { name } = req.body;
  const api_key = crypto.randomBytes(24);
  // '${api_key.toString('hex')}
  try {
    const data = await sitesModel.insertWithReturn('name, api_key, user_id', `'${name}','${api_key.toString('hex')}', ${req.user.id}`);
    res.status(201).send({ newProject: data });
  } catch (error) {
    res.send(500).send({ message: error.stack });
  }
};