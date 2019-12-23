import express from 'express';
import Users from '../../controllers/users/users';
import {
  validateUser,
  validations,
  validateUserLogin
} from '../../middleware/validateUser';
import { checkUser, checkUserLogin } from '../../middleware/checkUser';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';

const users = new Users();

const router = express.Router();

router.post(
  '/',
  validateUser,
  asyncHandler(checkUser),
  validations,
  users.signup
);
router.post(
  '/login',
  validateUserLogin,
  asyncHandler(checkUserLogin),
  validations,
  users.login
);

export default router;
