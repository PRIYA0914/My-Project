const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

router.post('/login', userController.loginUser.bind(userController));

module.exports = router;