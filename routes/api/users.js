import express from 'express';
import Users from '../../controllers/users';
import {
  validateUser,
  validations,
  validateUserLogin
} from '../../middleware/validateAll';
import { checkUser, checkUserLogin } from '../../middleware/checkUser';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';

const users = new Users();

const router = express.Router();

router.post(
  '/',
  validateUser,
  asyncHandler(checkUser),
  validations,
  asyncHandler(users.signup)
);
router.post(
  '/login',
  validateUserLogin,
  asyncHandler(checkUserLogin),
  validations,
  asyncHandler(users.login)
);

export default router;
