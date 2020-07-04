import Model from '../models/model';
import bcrypt, { hash } from 'bcrypt';

const usersModel = new Model('users');

export const allUsers = async (req, res) => {
  try {
    const data = await usersModel.select('*');
    res.status(200).json({ users: data.rows });
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
};

export const registerNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username.includes(' ')) {
    return res.status(400).send({ message: 'Username should not have spaces' });
  }

  try {
    console.log(username, email, password);
    const hashPass = await bcrypt.hash(password, 10);
    const user = await usersModel.select('*',`WHERE username = '${username}'`);

    if (user.rows.length > 0) {
      return res.status(400).send({message: 'Username already exists'});
    } else {
      console.log('BEFORE');
      const insertUser = await usersModel.insertWithReturn('username, password, email', `'${username}', '${hashPass}', '${email}'`);
      console.log('after');
      return res.status(201).send({createdUser: insertUser.rows});
    }
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
};

