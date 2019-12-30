import express from 'express';
import Category from '../../controllers/category';
import { validateCategory, validations } from '../../middleware/validateAll';
import auth from '../../middleware/auth';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';
import { checkAdmin } from '../../middleware/isAdmin';
import { checkCategoryAccess } from '../../middleware/checkItem';

const category = new Category();

const router = express.Router();

router.post(
  '/',
  [auth, asyncHandler(checkAdmin), validateCategory, validations],
  asyncHandler(category.createCategory)
);
router.get('/', asyncHandler(category.getCategories));
router.get('/:categoryId', asyncHandler(category.getOneCategory));
router.put(
  '/:categoryId',
  [
    auth,
    asyncHandler(checkCategoryAccess),
    asyncHandler(checkAdmin),
    validateCategory,
    validations
  ],
  asyncHandler(category.updateCategory)
);
router.delete(
  '/:categoryId',
  [auth, asyncHandler(checkCategoryAccess), asyncHandler(checkAdmin)],
  asyncHandler(category.deleteOneCategory)
);
export default router;
