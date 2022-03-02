import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  signupUser,
  invalidUser,
  existingUser,
  loginUser,
  invalidLoginUser,
  invalidLoginUserPassword,
} from '../testingData/user.json';
import { profileContent, invalidToken } from '../testingData/profile.json';

let token;
let loginUserToken;

chai.use(chaiHttp);
chai.should();

before(async () => {});

describe('User', () => {
  it('Should create a user and return the status 201', async () => {
    const res = await chai
      .request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(signupUser);
    res.should.have.status(201);
    token = res.body.token.generate;
  });
  it("Should throw 400 request when all users's credentials are not provided ", async () => {
    const res = await chai
      .request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(invalidUser);
    res.should.have.status(400);
  });
  it('Should throw 400 request when the email address is already taken ', async () => {
    const res = await chai
      .request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(existingUser);
    res.should.have.status(400);
  });
  it('Should login a user and return the status 200', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(loginUser);
    res.should.have.status(200);
    loginUserToken = res.body.token.generate;
  });
  it('Should not login with wrong email address', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(invalidLoginUser);
    res.should.have.status(400);
  });
  it('Should not login with wrong password', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(invalidLoginUserPassword);
    res.should.have.status(400);
  });
  describe('Profile', () => {
    it('Should not create a profile without a token return a status of 401', async () => {
      const res = await chai
        .request(app)
        .post('/api/profile')
        .send(profileContent);
      res.should.have.status(401);
    });
    it('Should not create a profile with an invalid token, will return a status of 401', async () => {
      const res = await chai
        .request(app)
        .post('/api/profile')
        .set('auth-token', invalidToken)
        .send(profileContent);
      res.should.have.status(401);
    });
    it('Should create a profile and return a status of 201', async () => {
      const res = await chai
        .request(app)
        .post('/api/profile')
        .set('auth-token', token)
        .send(profileContent);
      res.should.have.status(201);
    });
    it('Should update the profile and return a status of 200', async () => {
      const res = await chai
        .request(app)
        .post('/api/profile')
        .set('auth-token', token)
        .send(profileContent);
      res.should.have.status(200);
    });
    it('Should get the authenticated user profile and return the status 200', async () => {
      const res = await chai
        .request(app)
        .get('/api/profile/me')
        .set('auth-token', token)
        .send(profileContent);
      res.should.have.status(200);
    });
    it('Should return the status 400 if the current user does not have any profile', async () => {
      const res = await chai
        .request(app)
        .get('/api/profile/me')
        .set('auth-token', loginUserToken)
        .send(profileContent);
      res.should.have.status(400);
    });
  });
});
