/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import httpError from '../helpers/errorsHandler/httpError';
import Category from '../models/Category';

const checkItem = async (req, res, next) => {
  const { category_id } = req.params;
  if (category_id) {
    const category = await Category.findById(category_id);
    if (category.user.toString() !== req.user.id) {
      throw new httpError(401, 'Action denied');
    }
    next();
  }
};
export { checkItem };
