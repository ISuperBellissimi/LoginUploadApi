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
songRouter.get('/hint/:hint', jsonParser, token.checkToken);
songRouter.get('/hint/:hint', jsonParser, songController.getSongsByHint);

// print all songs of a category
// TODO: non presente alcun metodo per gestirle
//songRouter.get('/category/:category', token.checkToken)
//songRouter.get('/category/:category', songController.getSongs);

// add song
songRouter.post('', jsonParser, token.checkToken);
songRouter.post('', jsonParser, songController.newSong);

// delete all songs by artist
songRouter.delete('', jsonParser, token.checkToken);
songRouter.delete('', jsonParser, songController.deleteSongs);

// show a song
songRouter.get('/song_id/:song_id', jsonParser, token.checkToken);
songRouter.get('/song_id/:song_id', jsonParser, songController.getSong);

// modify a song (only an artist can modify his song)
songRouter.post('/modify', jsonParser, token.checkToken);
songRouter.post('/modify', jsonParser, songController.modifySong);

// delete a song
songRouter.delete('/song_id/:song_id', jsonParser, token.checkToken);
songRouter.delete('/song_id/:song_id', jsonParser, songController.deleteSong);

module.exports = songRouter;    // export to use in index.js
