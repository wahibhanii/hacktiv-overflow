const Question = require('../models/question')

class QuestionsController {

  static createQuestion (req, res) {
    console.log(req.body,'=======================', (req.body.title !== undefined )&& (req.body.content!==undefined))
    if ((req.body.title !== undefined )&& (req.body.content!==undefined)){
      let newQuestion = {
        title     : req.body.title,
        content   : req.body.content,
        author    : req.headers.decoded._id ,
        answers   : [],
        upvoters: [],
        downvoters: [],
        createdAt: new Date(),
        updatedAt: null,
      }
      console.log(newQuestion)
      Question.create(newQuestion)
      .then(result => {
        console.log(result);
        res.status(200).json({
          message : 'Create question successful!',
          data    : result
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    } else {
      res.status(202).json({
        message : 'Create question unsuccessful!'
      })
    }
    
  }

  static updateQuestion (req, res) {
    console.log('find question', req.body, req.params.id)
    req.body.updatedAt = new Date()
    Question.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Question Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static deleteQuestion (req, res) {
    console.log('find question', req.params.id)
    Question.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Question deleted',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static findQuestionById (req, res) {
    console.log('find question', req.params.id)
    Question.findOne({_id: req.params.id})
    .populate('author')
    // .populate('answers')
    .populate(
      {
        path: 'answers',
        model: 'Answer',
        populate: {
          path: 'author',
          model: 'User'
        }
      }
    )
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Question Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static findAllQuestion (req, res) {
    Question.find({}).populate('author')
    .sort({createdAt: 'desc'})
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'All Questions Found',
        data: result
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static upvote (req, res) {
    let questionId = req.params.id
    let userId = req.headers.decoded._id
    Question.findOne({_id: questionId})
    .then (dataQuestion => {
      console.log(dataQuestion, userId)
      if (dataQuestion.downvoters.indexOf(userId) !== -1) {
        console.log('removing downvote')
        dataQuestion.downvoters.splice(dataQuestion.downvoters.indexOf(userId),1);
      }
      console.log('>>>>>>>>',dataQuestion.upvoters.indexOf(userId) )
      if (dataQuestion.upvoters.indexOf(userId) === -1){
        dataQuestion.upvoters.push(userId)
      } else {
        dataQuestion.upvoters.splice(dataQuestion.upvoters.indexOf(userId),1);
      }
      return Question.findOneAndUpdate({_id: questionId}, dataQuestion, {new: true})
    })
    .then (updateResult => {
      console.log(updateResult)
      res.status(200).json({
        message: 'Question upvote/unupvote done',
        data: updateResult
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static downvote (req, res) {
    let questionId = req.params.id
    let userId = req.headers.decoded._id
    Question.findOne({_id: questionId})
    .then (dataQuestion => {
      console.log(dataQuestion, userId)
      if (dataQuestion.upvoters.indexOf(userId) !== -1) {
        console.log('removing downvote')
        dataQuestion.upvoters.splice(dataQuestion.upvoters.indexOf(userId),1);
      }
      console.log('>>>>>>>>',dataQuestion.downvoters.indexOf(userId) )
      if (dataQuestion.downvoters.indexOf(userId) === -1){
        dataQuestion.downvoters.push(userId)
      } else {
        dataQuestion.downvoters.splice(dataQuestion.downvoters.indexOf(userId),1);
      }
      return Question.findOneAndUpdate({_id: questionId}, dataQuestion, {new: true})
    })
    .then (updateResult => {
      console.log(updateResult)
      res.status(200).json({
        message: 'Question downvote/undownvote done',
        data: updateResult
      })
    })
    .catch (err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

}

module.exports = QuestionsController