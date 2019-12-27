import express from 'express';
import Profile from '../../controllers/profile/profile';
import { validateProfile } from '../../middleware/validateProfile';
import auth from '../../middleware/auth';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';
import { validations } from '../../middleware/validateUser';

const profile = new Profile();

const router = express.Router();


router.post('/', [auth, validateProfile, validations], asyncHandler(profile.createOrUpdateProfile));
router.get('/me', [auth], asyncHandler(profile.currentUserProfile));
export default router;
