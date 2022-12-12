const express = require('express');
const songRouter = express.Router();
const songController = require('../controllers/song.js');
const token = require('../controllers/token.js');
var bodyParser = require('body-parser')


var jsonParser = bodyParser.json()


// print all songs
songRouter.get('', jsonParser, token.checkToken)
songRouter.get('', jsonParser, songController.getSongs);

// print all songs with a hint
songRouter.get('/hint/:hint', jsonParser, token.checkToken)
songRouter.get('/hint/:hint', jsonParser, songController.getSongsByHint)

// print all songs of a category
// TODO: non presente alcun metodo per gestirle
//songRouter.get('/category/:category', token.checkToken)
//songRouter.get('/category/:category', songController.getSongs);

// add song
songRouter.post('', jsonParser, token.checkToken)
songRouter.post('', jsonParser, songController.newSong);

// delete all songs
songRouter.delete('', token.checkToken);
songRouter.delete('', songController.deleteSongs);

// show a song
songRouter.get('/:user/song/:title', songController.getSong);

// modify a song
songRouter.post('/:user/song/:title', songController.modifySong);

// delete a song
songRouter.delete('/:user/song/:title', songController.deleteSong)

module.exports = songRouter;    // export to use in index.js
