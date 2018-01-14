const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswersController {

  static createAnswer (req, res) {
    let answerId
    // console.log(req.body,'=======================',(req.body.content!==undefined))
    if (req.body.content!==undefined){
      let newAnswer = {
        content   : req.body.content,
        author    : req.headers.decoded._id ,
        answerTo   : req.body.questionId,
        upvoters  : [],
        downvoters: [],
        createdAt: new Date(),
        updatedAt: null,
      }
      // console.log(newAnswer)
      Answer.create(newAnswer)
      .then(result => {
        // console.log(result)
        answerId = result._id
        return Question.findOne({_id: req.body.questionId})
      })
      .then(dataQuestion => {
        console.log(typeof answerId,'<<<<<')
        dataQuestion.answers.push(answerId)
        console.log(dataQuestion,'>>>>>>>>')
        return Question.findOneAndUpdate({_id: dataQuestion._id}, dataQuestion,{new: true})
      })
      .then(updateResult => {
        console.log(updateResult);
        res.status(200).json({
          message : 'Create answer successful!',
          data    : updateResult
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    } else {
      res.status(202).json({
        message : 'Create answer unsuccessful!'
      })
    }
    
  }

  static updateAnswer (req, res) {
    console.log('find answer', req.body, req.params.id)
    req.body.updatedAt = new Date()
    Answer.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Answer Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static deleteAnswer (req, res) {
    let questionId = req.body.questionId
    let answerId = req.params.id
    Question.findOne({_id: questionId})
    .then(dataQuestion => {
      console.log('removing answer from question...')
      dataQuestion.answers.splice(dataQuestion.answers.indexOf(answerId),1);
      return Question.update({_id: questionId}, dataQuestion, {new: true})
    })
    .then(updatedQuestion => {
      console.log('deleting answer...')
      return Answer.deleteOne({_id: answerId})
    })
    .then(result => {
      res.status(200).json({
        message: 'Remove answer successful!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static findAnswerById (req, res) {
    console.log('find answer', req.params.id)
    Answer.findOne({_id: req.params.id}).populate('author')
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Answer Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static findAllAnswer (req, res) {
    Answer.find({}).populate('author')
    .sort({createdAt: 'desc'})
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'All Answers Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

}

module.exports = AnswersController