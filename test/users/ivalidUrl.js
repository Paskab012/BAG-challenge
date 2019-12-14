import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

describe('INVALID URL 404', () => {
  it('Should throw a 404 when user enters an Invalid URL', (done) => {
    chai
      .request(app)
      .get('/api/INVALID_URL')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(404);
        done();
      });
  });
});
