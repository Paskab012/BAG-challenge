/* eslint-disable import/prefer-default-export */
import User from '../models/User';

const checkUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

export { checkUser };
