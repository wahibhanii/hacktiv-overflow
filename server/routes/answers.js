const express         = require ('express');
const router          = express.Router();
const AnswersController = require('../controllers/answersController');
const authentication = require('../middleware/authentication')


//Create answer
router.post('/', authentication, AnswersController.createAnswer);

//All Answer
router.get('/', authentication, AnswersController.findAllAnswer);

//get answer by Id
router.get('/:id', authentication, AnswersController.findAnswerById);

//get answer by Owner Id
router.get('/users/:id', authentication, AnswersController.findAnswerById);

// edit answer
router.put('/:id', authentication, AnswersController.updateAnswer);

// delete answer
router.delete('/:id', authentication, AnswersController.deleteAnswer);

// Upvote answer
router.put('/:id/upvote', authentication, AnswersController.upvote);

// Upvote answer
router.put('/:id/downvote', authentication, AnswersController.downvote);

module.exports = router;
