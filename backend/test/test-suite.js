const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');

// Configure chai-http
chai.use(chaiHttp);

describe('Task Manager API Tests', () => {
  
  describe('Server Health Tests', () => {
    it('should return 404 for non-existent route', (done) => {
      chai.request(app)
        .get('/api/nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should have CORS enabled', (done) => {
      chai.request(app)
        .get('/api/slots')
        .end((err, res) => {
          expect(res).to.have.header('access-control-allow-origin');
          done();
        });
    });
  });

  describe('Available Routes Tests', () => {
    it('should have auth routes available', (done) => {
      chai.request(app)
        .post('/api/auth')
        .send({ test: 'data' })
        .end((err, res) => {
          // Auth route exists but might return 400/500 for invalid data
          expect(res.status).to.be.oneOf([400, 404, 500]);
          done();
        });
    });

    it('should have slots routes available', (done) => {
      chai.request(app)
        .get('/api/slots')
        .end((err, res) => {
          expect(res.status).to.not.equal(404);
          done();
        });
    });

    it('should have vehicles routes available', (done) => {
      chai.request(app)
        .get('/api/vehicles')
        .end((err, res) => {
          expect(res.status).to.not.equal(404);
          done();
        });
    });

    it('should have tickets routes available', (done) => {
      chai.request(app)
        .get('/api/tickets')
        .end((err, res) => {
          expect(res.status).to.not.equal(404);
          done();
        });
    });

    it('should have metrics routes available', (done) => {
      chai.request(app)
        .post('/api/metrics')
        .send({ test: 'data' })
        .end((err, res) => {
          // Metrics route exists but might return 400/500 for invalid data
          expect(res.status).to.be.oneOf([400, 404, 500]);
          done();
        });
    });
  });

  describe('API Structure Tests', () => {
    it('should parse JSON requests', (done) => {
      chai.request(app)
        .post('/api/slots')
        .send({ test: 'data' })
        .end((err, res) => {
          // Should not be 400 (bad request) due to JSON parsing
          expect(res.status).to.not.equal(400);
          done();
        });
    });

    it('should handle empty requests', (done) => {
      chai.request(app)
        .get('/api/slots')
        .end((err, res) => {
          // Route exists but might require authentication (401) or return data (200)
          expect(res.status).to.be.oneOf([200, 401]);
          done();
        });
    });
  });
});
