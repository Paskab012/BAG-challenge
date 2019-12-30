import express from 'express';
import Profile from '../../controllers/profile';
import { validateProfile, validations } from '../../middleware/validateAll';
import auth from '../../middleware/auth';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';

const profile = new Profile();

const router = express.Router();


router.post('/', [auth, validateProfile, validations], asyncHandler(profile.createOrUpdateProfile));
router.get('/me', [auth], asyncHandler(profile.currentUserProfile));
export default router;
