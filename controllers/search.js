import Category from '../models/Category';
import Products from '../models/Products';
import Profile from '../models/Profile';
import httpError from '../helpers/errorsHandler/httpError';

/**
 * @exports
 * @class
 */
class SearchController {
  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async searchFunc(req, res) {
    const { search } = req.query;
    const regex = new RegExp(search, 'i');
    const foundCategories = await Category.find().or([
      { title: { $regex: regex } },
      { description: { $regex: regex } }
    ]);
    const foundProducts = await Products.find().or([
      { title: { $regex: regex } },
      { description: { $regex: regex } }
    ]);
    const foundProfile = await Profile.find().or([
      { company: { $regex: regex } },
      { location: { $regex: regex } },
      { bio: { $regex: regex } }
    ]);
    if (
      !foundCategories.length
      && !foundProducts.length
      && !foundProfile.length
    ) {
      throw new httpError(404, 'Item not found');
    }
    res.status(200).json({
      status: 200,
      foundCategories,
      foundProducts,
      foundProfile
    });
  }
}

export default SearchController;
