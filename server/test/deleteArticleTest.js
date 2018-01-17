const chai      = require('chai');  
const app       = require('../app')
const chaiHttp  = require('chai-http');
const jwt       = require('jsonwebtoken')
const assert    = chai.assert;    // Using Assert style
const expect    = chai.expect;    // Using Expect style
const should    = chai.should();  // Using Should style
const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTUzNDcwZTkzNzY5ZTlmZjQzNGVjYmQiLCJlbWFpbCI6IndhaGliLmhhbmlpQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiV2FoaWIgSGFuaWlmdWwiLCJpYXQiOjE1MTU0MDcyMjF9.1C-rXbJWfbLoqj9ZChbWgEFhl5I-CjWgAEUPv_OgFHs' 
const ARTICLE_ID = '5a534e39779dfda7acd3100c'
chai.use(chaiHttp);


describe ('Delete Article on failed', () => {
  it ('file found if not deleted', (done) => {
    chai.request(app)
    .delete(`/articles/1233445`)
    .set({
      token : USER_TOKEN
    })
    .end( (err, res) => {
      res.status.should.equal(500)
      chai.request(app)
      .get(`/articles/${ARTICLE_ID}`)
      .set({
        token : USER_TOKEN
      })
      .end( (err, result) => {
        result.status.should.equal(200)
        expect(result.body.data.title).to.equal('Blog title')
        expect(result.body.data.content).to.equal('Blog content example')
        done()

        
      })
    })
  })
})

describe ('Delete article on success', () => {
  it ('returns correct response', (done) => {
    chai.request(app)
    .delete(`/articles/${ARTICLE_ID}`)
    .set({
      token : USER_TOKEN
    })
    .end( (err, res) => {
      res.status.should.equal(200)
      chai.request(app)
      .get(`/articles/${ARTICLE_ID}`)
      .set({
        token : USER_TOKEN
      })
      .end( (err, res) => {
        res.status.should.equal(200)
        expect(res.body.data).to.equal(null)
        done()
      })
    })
  })
})

