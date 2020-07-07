import Model from '../models/model';
import { pool } from '../models/pool';

const sitesModel = new Model('project');

export const formSubmit = async (req, res) => {
  try {
    const site_data = await sitesModel.select('*', `WHERE api_key = '${req.params.key}'`);
    const data = await appendJSON(site_data[0].id, req.body, req.params.form);
    let message = 'Successfully stored to JSONstore: ' + ((req.params.form) ? req.params.form : 'default');
    return res.status(201).send({ message: message});
  } catch (error) {
    return res.status(500).send({ message: error.stack });
  }
};

const appendJSON = async (id, data, form) => {
  let field = 'default';
  if (form) field = form;

  const append = `
  UPDATE project
  SET form_data = (
    CASE
    WHEN form_data ->$<field> IS NOT NULL
    THEN jsonb_set(form_data::jsonb, array[$<field>], (form_data->$<field>)::jsonb || $<data>::JSONB)
    WHEN form_data ->$<field> IS NULL
    THEN jsonb_insert(form_data, '{$<rawField>}', $<dataArray>::jsonb)
    END)
  WHERE id = $<id>;
  `;
  const values = {
    field,
    rawField: {
      toPostgres: (a) => field,
      rawType: true,
    },
    data: JSON.stringify(data),
    dataArray: JSON.stringify([ data ]),
    id,
  };
  return pool.query(append, values);
};