const chai      = require('chai');  
const app       = require('../app')
const chaiHttp  = require('chai-http');
const bcrypt    = require('bcryptjs');
const salt      = bcrypt.genSaltSync(10);
const assert    = chai.assert;    // Using Assert style
const expect    = chai.expect;    // Using Expect style
const should    = chai.should();  // Using Should style

chai.use(chaiHttp);

describe('Create user data handling tests' ,function ()  {
  it ('returns created user on success', function (done)  {
    // this.timeout(5000)
    chai.request(app)
    .post('/users/')
    .send({
      userName : 'Wahib Haniiful',
      email    : 'wahib.hanii@gmail.com',
      password : 'wahibpass'
    })
    .end(function (err, res)  {
      console.log('>>',res.body)
      expect(res.body.data.userName).to.equal('Wahib Haniiful')
      expect(res.body.data.email).to.equal('wahib.hanii@gmail.com')
      // expect('wahibpass', bcrypt.compareSync(req.body.data.password)).to.equal(true)
      done()
    })
  })

  it ('userName should not be empy', (done) => {
    chai.request(app)
    .post('/users/')
    .send({
      email    : 'wahib.hanii@gmail.com',
      password : 'wahibpass'
    })
    .end( (err, res) => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  it ('email should not be empty', (done) => {
    chai.request(app)
    .post('/users/')
    .send({
      userName : 'Wahib Haniiful',
      password : 'wahibpass'
    })
    .end( (err, res) => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  it ('Password should not be empty', (done) => {
    chai.request(app)
    .post('/users/')
    .send({
      email    : 'wahib.hanii@gmail.com',
      userName : 'Wahib Haniiful',
    })
    .end( (err, res) => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  
})
