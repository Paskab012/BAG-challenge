import express from 'express';
import Category from '../../controllers/category/category';
import { validateCategory } from '../../middleware/validateCategory';
import auth from '../../middleware/auth';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';
import { validations } from '../../middleware/validateUser';
import { checkAdmin } from '../../middleware/isAdmin';
import { checkItem } from '../../middleware/checkItemAccess';

const category = new Category();

const router = express.Router();

router.post(
  '/',
  [auth, asyncHandler(checkAdmin), validateCategory, validations],
  asyncHandler(category.createCategory)
);
router.get('/', auth, asyncHandler(category.getCategories));
router.get('/:category_id', auth, asyncHandler(category.getOneCategory));
router.put(
  '/:category_id',
  [
    auth,
    asyncHandler(checkItem),
    asyncHandler(checkAdmin),
    validateCategory,
    validations
  ],
  asyncHandler(category.updateCategory)
);
router.delete(
  '/:category_id',
  [auth, asyncHandler(checkItem), asyncHandler(checkAdmin)],
  asyncHandler(category.deleteOneCategory)
);
export default router;
