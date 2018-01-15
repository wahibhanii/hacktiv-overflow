const express         = require ('express');
const router          = express.Router();
const QuestionsController = require('../controllers/questionsController');
const authentication = require('../middleware/authentication')


//Create question
router.post('/', authentication, QuestionsController.createQuestion);

//All Question
router.get('/', authentication, QuestionsController.findAllQuestion);

//get question by Id
router.get('/:id', authentication, QuestionsController.findQuestionById);

//get question by Owner Id
router.get('/users/:id', authentication, QuestionsController.findQuestionById);

// delete question
router.put('/:id', authentication, QuestionsController.updateQuestion);

// delete question
router.delete('/:id', authentication, QuestionsController.deleteQuestion);

// Upvote answer
router.put('/:id/upvote', authentication, QuestionsController.upvote);

// Upvote answer
router.put('/:id/downvote', authentication, QuestionsController.downvote);

module.exports = router;
