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

export const allProjectsInfo = async (req, res) => {
  try {
    const data = await sitesModel.select('id, name, api_key, Array(SELECT jsonb_object_keys(form_data)) as forms, octet_length(form_data::text) as size', `WHERE user_id = ${req.user.id} ORDER BY id ASC`);
    res.status(200).send({ projects: data });
  } catch (error) {
    res.status(500).send({ message: error.stack });
  }
};

export const getProjectData = async (req, res) => {
  try {
    const data = await sitesModel.select('*', `WHERE user_id = ${req.user.id} and id = ${req.params.projectId}`);
    res.status(200).send({ project: data });
  } catch (error) {
    res.status(500).send({ message: error.stack });
  }
};

export const getFormData = async (req, res) => {
  try {
    const data = await sitesModel.select(`form_data->'${req.params.form}'`, `WHERE user_id = ${req.user.id} and id = ${req.params.projectId}`);
    res.status(200).send({ data: data[0]['?column?'] });
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
