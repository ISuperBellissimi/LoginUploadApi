const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.js');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

// create an account
authRouter.post('/registration', jsonParser, authController.createAccount);

// login
authRouter.post('/login', jsonParser, authController.login);



module.exports = authRouter;    // export to use in index.js
