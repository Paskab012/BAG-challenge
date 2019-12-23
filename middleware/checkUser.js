/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';
import User from '../models/User';
import httpError from '../helpers/errorsHandler/httpError';

const checkUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new httpError(400, 'User already exists');
  }
  next();
};

const checkUserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new httpError(400, 'Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new httpError(400, 'Invalid credentials');
  }
  next();
};
export { checkUser, checkUserLogin };
