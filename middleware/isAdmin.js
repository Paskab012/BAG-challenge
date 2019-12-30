/* eslint-disable import/prefer-default-export */
import User from '../models/User';
import httpError from '../helpers/errorsHandler/httpError';

const checkAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user.isAdmin) {
    throw new httpError(401, 'Access denied');
  }
  next();
};

export { checkAdmin };
