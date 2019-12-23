import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../index';
import User from '../../models/User';
import UserController from '../../controllers/users/users';
import {
  signupUser,
  invalidUser,
  existingUser,
  loginUser,
  invalidLoginUser,
  invalidLoginUserPassword
} from '../../testingData/user.json';

const newUser = new UserController();
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
    user.save();
  });

  it('Should create a user and return the status 201', async () => {
    const res = await chai
      .request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(signupUser);
    res.should.have.status(201);
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
});
