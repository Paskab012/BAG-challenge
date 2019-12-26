import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import User from '../../models/User';
import Profile from '../../models/Profile';
import {
  signupUser,
  invalidUser,
  existingUser,
  loginUser,
  invalidLoginUser,
  invalidLoginUserPassword
} from '../../testingData/user.json';
import { profileContent, invalidToken } from '../../testingData/profile.json';

let token;
const user = new User({
  name: existingUser.name,
  email: existingUser.email,
  password: existingUser.password,
  avatar: existingUser.avatar,
  isAdmin: existingUser.isAdmin
});

chai.use(chaiHttp);
chai.should();


describe('User', () => {
  before(async () => {
    await User.findOneAndDelete({ email: signupUser.email });
    await Profile.remove({});
    user.save();
  });

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
  it('Should login a user and return the status 201', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(loginUser);
    res.should.have.status(200);
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
  });
});
