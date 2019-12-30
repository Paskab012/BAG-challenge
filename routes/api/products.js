import express from 'express';
import Products from '../../controllers/product';
import { validateProduct, validations } from '../../middleware/validateAll';
import auth from '../../middleware/auth';
import asyncHandler from '../../helpers/errorsHandler/asyncHandler';
import { checkAdmin } from '../../middleware/isAdmin';
import {
  checkProductAccess,
  checkProductFound
} from '../../middleware/checkItem';

const products = new Products();

const router = express.Router();

router.post(
  '/:categoryId',
  [auth, asyncHandler(checkAdmin), validateProduct, validations],
  asyncHandler(products.createProducts)
);
router.get('/', asyncHandler(products.getProducts));
router.get(
  '/:productId',
  asyncHandler(checkProductFound),
  asyncHandler(products.getOneProduct)
);
router.put(
  '/:productId',
  [
    auth,
    asyncHandler(checkAdmin),
    validateProduct,
    validations,
    asyncHandler(checkProductFound),
    asyncHandler(checkProductAccess)
  ],
  asyncHandler(products.updateProduct)
);
router.delete(
  '/:productId',
  [
    auth,
    asyncHandler(checkAdmin),
    asyncHandler(checkProductFound),
    asyncHandler(checkProductAccess)
  ],
  asyncHandler(products.deleteOneProduct)
);
export default router;
