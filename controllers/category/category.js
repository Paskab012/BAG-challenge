import Category from '../../models/Category';

/**
 * @exports
 * @class
 */
class CategoryController {
  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async createCategory(req, res) {
    const { title, description, image } = req.body;
    const newCategory = new Category({
      user: req.user.id,
      title,
      description,
      image
    });

    const category = await newCategory.save();
    res.status(201).json({
      status: 201,
      category
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async getCategories(req, res) {
    const categories = await Category.find({})
      .sort({
        date: -1
      })
      .populate('user', ['name', 'avatar']);
    res.status(200).json({
      status: 200,
      categories
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async getOneCategory(req, res) {
    const category = await Category.findById(
      req.params.category_id
    ).populate('user', ['name', 'avatar']);
    res.status(200).json({
      status: 200,
      category
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async updateCategory(req, res) {
    const updatedCategory = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
    };
    await Category.findOneAndUpdate(
      { _id: req.params.category_id },
      updatedCategory
    );
    res.status(200).json({ status: 200, updatedCategory });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async deleteOneCategory(req, res) {
    const category = await Category.findById(req.params.category_id);
    await category.remove();
    return res.status(200).json({
      status: 200,
      error: 'category removed'
    });
  }
}

export default CategoryController;
