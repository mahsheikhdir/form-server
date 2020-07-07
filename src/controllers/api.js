import Model from '../models/model';

const sitesModel = new Model('sites');

export const newFormSubmit = async (req, res) => {
  try {
    const site_data = await sitesModel.select('*', `WHERE api_key = '${req.params.key}'`);
    const data = await sitesModel.appendJSON(site_data[0].id, req.body);
    return res.status(201).send({ form_data: data.rows });
  } catch (error) {
    return res.status(500).send({ message: error.stack });
  }
};

export const formSubmit = async (req, res) => {
  try {
    const site_data = await sitesModel.select('*', `WHERE api_key = '${req.params.key}'`);
    const data = await sitesModel.appendJSON(site_data[0].id, req.body, req.params.form);
    return res.status(201).send({ form_data: data.rows });
  } catch (error) {
    return res.status(500).send({ message: error.stack });
  }
};
