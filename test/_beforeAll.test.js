/* eslint-disable import/prefer-default-export */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import User from '../models/User';
import Profile from '../models/Profile';
import Category from '../models/Category';
import {
  existingUser, loginUser, normalUser, isNotTheOwner
} from '../testingData/user.json';

let tokenToUse;
let res;

chai.use(chaiHttp);
chai.should();

const beforeFunc = async () => {
  await Profile.remove({});
  await User.remove({});
  await Category.remove({});
  await chai
    .request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(existingUser);
  await chai
    .request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(normalUser);
  await chai
    .request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(isNotTheOwner);

  res = await chai
    .request(app)
    .post('/api/users/login')
    .set('Content-Type', 'application/json')
    .send(loginUser);
  tokenToUse = res.body.token.generate;
  return tokenToUse;
};

export { beforeFunc };
