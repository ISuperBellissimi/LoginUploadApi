// per upload canzone
const Song = require('../models/song-model.js');
const mongoose = require("mongoose");


// print all songs
const getSongs = async function (req, res, next) {
  res.json({success: true, songs: await Song.find()})
};

// print songs with a hint
// case insensitive di canzoni che contengono con quel testo
const getSongsByHint = async function (req, res, next) {
  // hint in query
  let hint = req.params.hint;
  var songs = await Song.find({title: { $regex: new RegExp(hint.toLowerCase(), "i") }}).exec();
  res.json({success: true, songs: songs});
};



// add song
/* Esempio di richiesta:
{
  token: "sdnmdpsfdsf",
  song: {
    title: "title",
    ecc.
  }
}
*/
const newSong = (req, res, next) => {
  console.log(req.loggedUser);
  // controllo sia artista, altrimenti restituisco error
  // TODO: cambiare da isArtista a is_artista
  if (!req.loggedUser.isArtista){
    res.status(403).json({success:false, message:'Not Authorized'});
  }

  let song = req.body.song;
  const songToSave = new Song({title: song.title,
                               artist: req.loggedUser.id})

  songToSave.save(function (err, item) {
   if (err){
     console.log(err)
     return res.json({success: false, message: "Error, song not saved"});
   }
   return res.json({success: true,
                    message: "Success, song saved"});
  });

};

// delete all songs by artist
const deleteSongs = (req, res, next) => {
  res.json({message: "DELETE songs"});
};

// get one song
const getSong = (req, res, next) => {
  res.json({message: "GET song " + req.params.title });
};

// modify one song
const modifySong = (req, res, next) => {
  res.json({message: "Modify song " + req.params.title });
};

// delete one song
const deleteSong = (req, res, next) => {
  res.json({message: "DELETE song " + req.params.title });
};

module.exports = {
  getSongs,
  getSongsByHint,
  newSong,
  deleteSongs,
  getSong,
  modifySong,
  deleteSong
};
