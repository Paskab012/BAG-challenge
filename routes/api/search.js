import express from 'express';
import Search from '../../controllers/search';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';

const search = new Search();

const router = express.Router();

router.post('/', asyncHandler(search.searchFunc));

export default router;
