const chai      = require('chai');  
const app       = require('../app')
const chaiHttp  = require('chai-http');
const assert    = chai.assert;    // Using Assert style
const expect    = chai.expect;    // Using Expect style
const should    = chai.should();  // Using Should style

chai.use(chaiHttp);
const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTUzNDcwZTkzNzY5ZTlmZjQzNGVjYmQiLCJlbWFpbCI6IndhaGliLmhhbmlpQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiV2FoaWIgSGFuaWlmdWwiLCJpYXQiOjE1MTU0MDcyMjF9.1C-rXbJWfbLoqj9ZChbWgEFhl5I-CjWgAEUPv_OgFHs'
const ARTICLE_ID = '5a534e2642fd3ea761860b9a'

describe ('Update article on success', () => {
  it ('returns correct response', (done) => {
    chai.request(app)
    .put(`/articles/${ARTICLE_ID}`)
    .send({
      title      : 'Blog title edited',
      content    : 'Blog content example edited'
    })
    .set({
      token : USER_TOKEN
    })
    .end( (err, res) => {
      res.status.should.equal(200)
      chai.request(app)
      .get(`/articles/${res.body.data._id}`)
      .set({
        token : USER_TOKEN
      })
      .end( (err, res) => {
        res.status.should.equal(200)
        expect(res.body.data.title).to.equal('Blog title edited')
        expect(res.body.data.content).to.equal('Blog content example edited')
        done()
      })
    })
  })
})

describe ('Update article on fail', () => {
  it ('file not found if not created, no title', (done) => {
    chai.request(app)
    .put('/articles/98df98a7sd')
    .send({
      content: 'Blog content example'
    })
    .set({
      token : USER_TOKEN
    })
    .end( (err, res) => {
      res.status.should.equal(500)
      done()
    })
  })
})