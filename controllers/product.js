import Products from '../models/Products';
import HttpError from '../helpers/errorsHandler/httpError';

/**
 * @exports
 * @class
 */
class ProductsController {
  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async createProducts(req, res) {
    const { categoryId } = req.params;
    const {
      title, description, image, price
    } = req.body;
    const newProducts = new Products({
      user: req.user.id,
      category: categoryId,
      title,
      description,
      image,
      price
    });

    const products = await newProducts.save();
    res.status(201).json({
      status: 201,
      products
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async getProducts(req, res) {
    const products = await Products.find({})
      .sort({
        date: -1
      })
      .populate('user', ['name', 'avatar'])
      .populate('category', ['title', 'description']);
    if (!products.length) {
      throw new HttpError(404, 'No available product for the moment');
    }
    res.status(200).json({
      status: 200,
      products
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async getOneProduct(req, res) {
    const { productId } = req.params;
    const products = await Products.findById(productId)
      .populate('user', ['name', 'avatar'])
      .populate('category', ['title', 'description']);
    res.status(200).json({
      status: 200,
      products
    });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async updateProduct(req, res) {
    const { productId } = req.params;
    const updatedProducts = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
    };
    await Products.findOneAndUpdate({ _id: productId }, updatedProducts);
    res.status(200).json({ status: 200, updatedProducts });
  }

  /**
   *
   * @param {Object} req Requests from client
   * @param {Object} res - Response from db
   * @returns {Object} Response
   */
  async deleteOneProduct(req, res) {
    const { productId } = req.params;
    const products = await Products.findById(productId);
    await products.remove();
    return res.status(200).json({
      status: 200,
      error: 'products removed'
    });
  }
}

export default ProductsController;
