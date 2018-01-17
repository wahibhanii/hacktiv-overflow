const express         = require ('express');
const router          = express.Router();
const UsersController = require('../controllers/usersController');


//Create user
router.post('/', UsersController.createUser);

// Login
router.post('/login', UsersController.login);

module.exports = router;
