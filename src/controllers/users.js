import bcrypt from 'bcrypt';
import Model from '../models/model';

const usersModel = new Model('users');

export const allUsers = async (req, res) => {
  try {
    console.log(req.host, req.origin);
    const data = await usersModel.select('*');
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
};

export const registerNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined') {
    return res.status(400).send({ message: 'Invalid or missing values' });
  }

  if (username.includes(' ')) {
    return res.status(400).send({ message: 'Username should not have spaces' });
  }

  try {
    console.log(username, email, password);
    const hashPass = await bcrypt.hash(password, 10);
    const user = await usersModel.select('*', `WHERE username = '${username}'`);

    if (user.length > 0) {
      return res.status(400).send({ message: 'Username already exists' });
    }
    const insertUser = await usersModel.insertWithReturn('username, password, email', `'${username}', '${hashPass}', '${email}'`);
    return res.status(201).send({ createdUser: insertUser.rows });
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
};

export const protectedRoute = async (req, res) => res.status(200).send({ message: 'successfully entered protected route' });
