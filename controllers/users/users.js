import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import generateToken from '../../helpers/generateToken';

/**
 * @user Controller
 * @exports
 * @class
 */
class UserController {
  /**
   *
   * @param {Object} req - Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async signup(req, res) {
    const {
      name, email, password, isAdmin
    } = req.body;
    const avatar = gravatar.url(email, {
      s: 200,
      r: 'pg',
      d: 'mm'
    });
    const user = new User({
      name,
      email,
      avatar,
      password,
      isAdmin
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }
    };
    const registeredUser = await User.findById(user.id).select('-password');
    const token = generateToken(payload);
    res.status(201).json({ status: 201, registeredUser, token });
  }

  /**
   *
   * @param {Object} req - Request from client
   * @param {Object} res - Response from the db
   * @returns {Object} Response
   */
  async login(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }
    };
    const token = generateToken(payload);
    return res.status(200).json({ status: 200, user, token });
  }
}

export default UserController;
