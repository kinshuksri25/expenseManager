/*
*   server unit test file
*/

//Dependencies
let request = require('supertest');
let {app} = require('../lib/server');

//Test the connection
//GET
describe('GET /getTestRoute', () => {
    test('responds with json', done => {
      request(app)
        .get('/getTestRoute')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

//POST
describe('POST /postTestRoute', function() {
  test('responds with json', function(done) {
      request(app)
        .post('/postTestRoute')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });