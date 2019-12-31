import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
chai.should();


describe('Search', () => {
  before(async () => {
  });
  it('Should search for the provided query and return the status 200', async () => {
    const res = await chai
      .request(app)
      .post('/api/search?search=boubou')
      .set('Content-Type', 'application/json');
    res.should.have.status(200);
  });
  it('Should not find the provided query and will return the status 404', async () => {
    const res = await chai
      .request(app)
      .post('/api/search?search=jody')
      .set('Content-Type', 'application/json');
    res.should.have.status(404);
  });
});
