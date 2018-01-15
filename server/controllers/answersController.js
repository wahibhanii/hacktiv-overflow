const Answer = require('../models/answer')
const Question = require('../models/question')
const sendAnsweredNotif = require ('../helper/nodemailer')

class AnswersController {

  static createAnswer (req, res) {
    let answerId
    let question
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
      let notifInfo={}
      notifInfo.answerContent = newAnswer.content
      notifInfo.answerer = req.headers.decoded
      // console.log(newAnswer)
      Answer.create(newAnswer)
      .then(result => {
        console.log(result,'---------------===============')
        answerId = result._id
        return Question.findOne({_id: req.body.questionId})
      })
      .then(dataQuestion => {
        console.log(dataQuestion,'cccccccccxxxxx')
        dataQuestion.answers.push(answerId)
        return Question.findOneAndUpdate({_id: dataQuestion._id}, dataQuestion,{new: true}).populate('author')
      })
      .then(updateResult => {
        console.log(updateResult);
        notifInfo.question = updateResult
        sendAnsweredNotif(notifInfo)
        console.log('_+-=-=-==-=-=', notifInfo)
        res.status(200).json({
          message : 'Create answer successful!',
          data    : updateResult,
          notifinfo: notifInfo
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

  static upvote (req, res) {
    let answerId = req.params.id
    let userId = req.headers.decoded._id
    Answer.findOne({_id: answerId})
    .then (dataAnswer => {
      console.log(dataAnswer, userId)
      if (dataAnswer.downvoters.indexOf(userId) !== -1) {
        console.log('removing downvote')
        dataAnswer.downvoters.splice(dataAnswer.downvoters.indexOf(userId),1);
      }
      console.log('>>>>>>>>',dataAnswer.upvoters.indexOf(userId) )
      if (dataAnswer.upvoters.indexOf(userId) === -1){
        dataAnswer.upvoters.push(userId)
      } else {
        dataAnswer.upvoters.splice(dataAnswer.upvoters.indexOf(userId),1);
      }
      return Answer.findOneAndUpdate({_id: answerId}, dataAnswer, {new: true})
    })
    .then (updateResult => {
      console.log(updateResult)
      res.status(200).json({
        message: 'Answer upvote/unupvote done',
        data: updateResult
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static downvote (req, res) {
    let answerId = req.params.id
    let userId = req.headers.decoded._id
    Answer.findOne({_id: answerId})
    .then (dataAnswer => {
      console.log(dataAnswer, userId)
      if (dataAnswer.upvoters.indexOf(userId) !== -1) {
        console.log('removing downvote')
        dataAnswer.upvoters.splice(dataAnswer.upvoters.indexOf(userId),1);
      }
      console.log('>>>>>>>>',dataAnswer.downvoters.indexOf(userId) )
      if (dataAnswer.downvoters.indexOf(userId) === -1){
        dataAnswer.downvoters.push(userId)
      } else {
        dataAnswer.downvoters.splice(dataAnswer.downvoters.indexOf(userId),1);
      }
      return Answer.findOneAndUpdate({_id: answerId}, dataAnswer, {new: true})
    })
    .then (updateResult => {
      console.log(updateResult)
      res.status(200).json({
        message: 'Answer downvote/undownvote done',
        data: updateResult
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

}

module.exports = AnswersController