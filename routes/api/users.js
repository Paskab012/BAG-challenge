import express from 'express';
import Users from '../../controllers/users/users';
import { validateUser } from '../../middleware/validateUser';
import { checkUser } from '../../middleware/checkUser';

const users = new Users();

const router = express.Router();


router.post('/', validateUser, checkUser, users.signup);

export default router;
