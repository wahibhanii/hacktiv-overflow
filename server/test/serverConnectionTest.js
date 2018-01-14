const chai      = require('chai');  
const app       = require('../app')
const chaiHttp  = require('chai-http');
const assert    = chai.assert;    // Using Assert style
const expect    = chai.expect;    // Using Expect style
const should    = chai.should();  // Using Should style

chai.use(chaiHttp);

describe('Test connection', () => {
  it ('returns status 200', (done) => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      res.status.should.equal(200)
      done()
    })
  })
})

describe('Test connection via URL', () => {
  it ('returns status should be 200', (done) => {
    chai.request('http://localhost:3000')
    .get('/')
    .end((err, res) => {
      res.status.should.equal(200)
      done()
    })
  })
})


