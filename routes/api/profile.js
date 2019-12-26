import express from 'express';
import Profile from '../../controllers/profile/profile';
import { validateProfile } from '../../middleware/validateProfile';
import auth from '../../middleware/auth';

const profile = new Profile();

const router = express.Router();


router.post('/', [auth, validateProfile], profile.createOrUpdateProfile);
export default router;
