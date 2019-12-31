import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { products, categoryToUse } from '../testingData/products.json';
import { normalUserLogin, isNotTheOwnerLogin, existingUser } from '../testingData/user.json';
import Products from '../models/Products';


chai.use(chaiHttp);
chai.should();

let token;
let productId;
let categoryId;
let isNotAminToken;
let isNotTheOwnerToken;

describe('Products', () => {
  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(normalUserLogin);
    isNotAminToken = res.body.token.generate;

    const result = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(isNotTheOwnerLogin);
    isNotTheOwnerToken = result.body.token.generate;

    const results = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(existingUser);
    token = results.body.token.generate;

    const category = await chai
      .request(app)
      .post('/api/category')
      .set('auth-token', token)
      .send(categoryToUse);
    categoryId = category.body.category._id;
  });
  it('Should not create product if the user is not an Admin return the status 401', async () => {
    const res = await chai
      .request(app)
      .post(`/api/products/${categoryId}`)
      .set('auth-token', isNotAminToken);
    res.should.have.status(401);
  });
  it('Should create a product and return the status 201', async () => {
    const res = await chai
      .request(app)
      .post(`/api/products/${categoryId}`)
      .set('auth-token', token)
      .send(products);
    res.should.have.status(201);
    productId = res.body.products._id;
  });
  it('Should not perform an action on product if the Admin is not the owner, will return the status 401', async () => {
    const res = await chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set('auth-token', isNotTheOwnerToken)
      .send(products);
    res.should.have.status(401);
  });
  it('Should get all products and return the status 200', async () => {
    const res = await chai
      .request(app)
      .get('/api/products')
      .set('Content-Type', 'application/json');
    res.should.have.status(200);
  });
  it('Should get one product and return the status 200', async () => {
    const res = await chai
      .request(app)
      .get(`/api/products/${productId}`)
      .set('Content-Type', 'application/json');
    res.should.have.status(200);
  });
  it('Should update one product and return the status 200', async () => {
    const res = await chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set('auth-token', token)
      .send(products);
    res.should.have.status(200);
  });
  it('Should delete one product and return the status 200', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/products/${productId}`)
      .set('auth-token', token);
    res.should.have.status(200);
  });
  it('Should return the status 404 if there is not available product', async () => {
    await Products.remove({});
    const res = await chai
      .request(app)
      .get('/api/products')
      .set('Content-Type', 'application/json');
    res.should.have.status(404);
  });
  it('Should return the status 404 if there is not product', async () => {
    const res = await chai
      .request(app)
      .get(`/api/products/${productId}`)
      .set('Content-Type', 'application/json');
    res.should.have.status(404);
  });
});
