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

//Route end to end testing

//for route /singup  
describe('POST /signUp', function() {
  test('signup new user', function(done) {
      request(app)
      .post('/signUp')
      .send({ "userName" : "dummySample",
              "password" : "samplePassword",
              "firstName" : "sample",
              "lastName" : "dummy",
              "photoUrl" : "sample url",
              "occupation" : "between jobs"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /login
describe('POST /login', function() {
  test('logs the user in', function(done) {
      request(app)
      .post('/login')
      .send({ "userName" : "dummySample",
              "password" : "samplePassword"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /login
describe('POST /login', function() {
  test('doesnot log the user in', function(done) {
      request(app)
      .post('/login')
      .send({ "userName" : "dummySample",
              "password" : "invalidPassword"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});


//for route /getUserData
describe('GET /getUserData', () => {
  test('responds with json', done => {
    request(app)
      .get('/getUserData')
      .query({ "userName": 'dummySample'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});   

//for route /addExp
describe('POST /addExp', function() {
  test('adds expenseCatagory', function(done) {
      request(app)
      .post('/addExp')
      .send({ "userName" : "dummySample",
              "expenseCatagories" : "sample"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /addExp
describe('POST /addExp', function() {
  test('doesnot add expenseCatagory', function(done) {
      request(app)
      .post('/addExp')
      .send({ "userName" : "dummySample"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});
 
//for route /addExp
describe('POST /addExp', function() {
  test('adds expenses', function(done) {
      request(app)
      .post('/addExp')
      .send({ "userName" : "dummySample",
              "expenses" : {
                                "category": "sampleCategory",
                                "itemName": " sampleItem",
                                "amount": 1000,
                                "expenseDate": "127821356",
                                "state": false
                            }
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /addExp
describe('POST /addExp', function() {
  test('doesnot add expenses', function(done) {
      request(app)
      .post('/addExp')
      .send({ "userName" : "dummySample",
              "expenses" : {
                                "category": "sampleCategory",
                                "itemName": " sampleItem",
                                "expenseDate": "127821356",
                                "state": false
                            }
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /editExpense
describe('PUT /editExpense', function() {
  test('edit expenses', function(done) {
      request(app)
      .put('/editExpense')
      .send({ "userName" : "dummySample",
              "expenses" : {
                                "category": "sampleCategory",
                                "itemName": " sampleItem",
                                "amount": 5000,
                                "expenseDate": "127821356",
                                "state": true,
                                "id": "66412552610"
                            }
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /editExpense
describe('PUT /editExpense', function() {
  test('doesnot edit expenses', function(done) {
      request(app)
      .put('/editExpense')
      .send({ "userName" : "dummySample",
              "expenses" : {
                                "category": "sampleCategory",
                                "itemName": " sampleItem",
                                "amount": 5000,
                                "expenseDate": "127821356",
                                "state": true
                            }
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /editBudget
describe('PUT /editBudget', function() {
  test('responds with json', function(done) {
      request(app)
      .put('/editBudget')
      .send({ "userName" : "dummySample",
              "budget" : 50000
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /editProfile
describe('PUT /editProfile', function() {
  test('edit the user profile', function(done) {
      request(app)
      .put('/editProfile')
      .send({ "userName" : "dummySample",
              "changeVar" : "userName",
              "changeVal" : "sampleDummy"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//for route /editProfile
describe('PUT /editProfile', function() {
  test('doesnot edit the user profile', function(done) {
      request(app)
      .put('/editProfile')
      .send({ "userName" : "dummySample",
              "changeVar" : "userName"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

// for route /deleteExpenseCatagories
describe('DELETE /deleteExpenseCatagories', function() {
  test('deletes the passed expense catagory', function(done) {
      request(app)
      .delete('/deleteExpenseCatagories')
      .send({ "userName" : "dummySample",
              "expenseCatagories" : "sample"
            })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});