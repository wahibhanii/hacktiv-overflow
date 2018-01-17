const chai      = require('chai');  
const app       = require('../app')
const chaiHttp  = require('chai-http');
const jwt       = require('jsonwebtoken')
const assert    = chai.assert;    // Using Assert style
const expect    = chai.expect;    // Using Expect style
const should    = chai.should();  // Using Should style
chai.use(chaiHttp);

describe('Login success test', () => {
  it ('returns a token', (done) => {
    chai.request(app)
    .post('/users/login')
    .send({
      email    : 'wahib.hanii@gmail.com',
      password : 'wahibpass'
    })
    .end( (err, res) => {
      console.log(res.body)
      res.status.should.equal(200)
      expect(res.body.token).to.exist
      expect(jwt.decode(res.body.token).email).to.equal('wahib.hanii@gmail.com')
      done()
    })
  })
})


describe('Login failed test', () => {
  it ('returns 202 on user not found', (done) => {
    chai.request(app)
    .post('/users/login')
    .send({
      email    : 'xxxxx.xxxxx@xxx.xxx',
      password : 'xxxxxxxx'
    })
    .end( (err, res) => {
      res.status.should.equal(202)
      res.body.message.should.equal('user not found')
      done()
    })
  })

  it ('returns 202 on user wrong password', (done) => {
    chai.request(app)
    .post('/users/login')
    .send({
      email    : 'wahib.hanii@gmail.com',
      password : 'wahibpasswrong'
    })
    .end( (err, res) => {
      res.status.should.equal(202)
      res.body.message.should.equal('Wrong Password, login fail')
      done()
    })
  })
})