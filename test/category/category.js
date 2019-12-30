import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { beforeFunc } from '../_beforeAll.test';
import { category, updatedCategory } from '../../testingData/category.json';
import { normalUserLogin, isNotTheOwnerLogin } from '../../testingData/user.json';

chai.use(chaiHttp);
chai.should();

let token;
let categoryId;
let isNotAminToken;
let isNotTheOwnerToken;

before(async () => {
  token = await beforeFunc();
});

describe('Category', () => {
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
  });
  it('Should not create category if the user is not an Admin return the status 401', async () => {
    const res = await chai
      .request(app)
      .post('/api/category')
      .set('auth-token', isNotAminToken);
    res.should.have.status(401);
  });
  it('Should create category and return the status 201', async () => {
    const res = await chai
      .request(app)
      .post('/api/category')
      .set('auth-token', token)
      .send(category);
    res.should.have.status(201);
    categoryId = res.body.category._id;
  });
  it('Should not perform an action on category if the Admin is not the owner, will return the status 401', async () => {
    const res = await chai
      .request(app)
      .put(`/api/category/${categoryId}`)
      .set('auth-token', isNotTheOwnerToken);
    res.should.have.status(401);
  });
  it('Should get all categories and return the status 200', async () => {
    const res = await chai
      .request(app)
      .get('/api/category')
      .set('auth-token', token);
    res.should.have.status(200);
  });
  it('Should get one category and return the status 200', async () => {
    const res = await chai
      .request(app)
      .get(`/api/category/${categoryId}`)
      .set('auth-token', token);
    res.should.have.status(200);
  });
  it('Should update one category and return the status 200', async () => {
    const res = await chai
      .request(app)
      .put(`/api/category/${categoryId}`)
      .set('auth-token', token)
      .send(updatedCategory);
    res.should.have.status(200);
  });
  it('Should delete one category and return the status 200', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/category/${categoryId}`)
      .set('auth-token', token);
    res.should.have.status(200);
  });
});
