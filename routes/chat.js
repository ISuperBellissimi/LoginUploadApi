const { text } = require('body-parser');
const express = require('express');
const textRouter = express.Router();
const textController = require('../controllers/chat.js');
const token = require('../controllers/token.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


textRouter.get('/chat_id/:chat_id', jsonParser, token.checkToken)
textRouter.get('/chat_id/:chat_id', textController.getTexts)

textRouter.get('/chat_id/:chat_id/:nome_utente', jsonParser, token.checkToken)
textRouter.get('/chat_id/:chat_id/:nome_utente', textController.getUserTexts)


textRouter.post('/chat_id/:chat_id', jsonParser, token.checkToken)
textRouter.post('/chat_id/:chat_id', textController.newText)

textRouter.delete('/chat_id/:chat_id', jsonParser, token.checkToken)
textRouter.delete('/chat_id/:chat_id', textController.deleteMyTexts)

textRouter.delete('/message_id/:message_id', jsonParser, token.checkToken)
textRouter.delete('/message_id/:message_id', textController.deleteText)


module.exports = textRouter;    // export to use in index.js
