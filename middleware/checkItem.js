/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import httpError from '../helpers/errorsHandler/httpError';
import Category from '../models/Category';
import Products from '../models/Products';

const checkCategoryAccess = async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (category.user.toString() !== req.user.id) {
    throw new httpError(401, 'Action denied');
  }
  next();
};
const checkProductAccess = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Products.findById(productId);

  if (product.user.toString() !== req.user.id) {
    throw new httpError(
      401,
      'Action denied, you are not the owner of this product'
    );
  }
  next();
};
const checkProductFound = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Products.findById(productId);

  if (!product) {
    throw new httpError(404, 'Product not found');
  }
  next();
};

export { checkCategoryAccess, checkProductAccess, checkProductFound };
