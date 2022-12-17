const express = require('express');
const router = express.Router();
const Chat = require('../models/chat'); // get our mongoose model
const User = require('../models/users-model'); // get our mongoose model

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

// gets all messages from a community
const getTexts = async function(req,res,next) {
  var community_id = req.params.chat_id;
  // only logged-in users can look at the community chat
  if(req.loggedUser.id != null) {
    Chat.find({community_id: community_id.toString()},(err, messages)=> {
        return res.send(messages);
    })
  }
}

// gets all messages from a user
const getUserTexts = async function(req,res,next) {
  var community_id = req.params.chat_id;
  if(req.loggedUser.id != null) {
    Chat.find({nome_utente: req.params.nome_utente, community_id: community_id.toString()},(err, messages)=> {
        return res.json({success: true, message: messages});
    })
  } 
}

// creating new message
const newText = async function (req,res,nexr) {
    try{
        // getting all the variables from token, body and parameters
        var utente = await User.findById(req.loggedUser.id).exec();
        var message = req.body.message;
        var community_id = req.params.chat_id;
        /* var savedMessage = await message.save() */
        if(utente.nome_utente != null) {
          Chat.insertMany([
            {nome_utente: utente.nome_utente, id_utente: req.loggedUser.id, message: message, community_id: community_id.toString()}
          ])
          console.log('saved');
        }
        else {
          console.log("error nome_utente null")
        }
        
        return res.sendStatus(200);
      }
      catch (error){
        console.log('error',error);
        return res.sendStatus(500);
      }
      finally{
        // console.log('Message Posted: ' + message._id + " " + message.name + " " + message.message + " " + message.created_at)
        // console.log('Message id:' + message._id)
      }
}

// va cambiato
const deleteMyTexts = async function (req,res,next) {
  // we can obtain the community id from the parameters
  var community_id = req.params.chat_id;
  
    try {
        //console.log(community_id);
        // using deleteMany method on user and community
        await Chat.deleteMany({id_utente: req.loggedUser.id, community_id: community_id.toString()}).then(function(){
          console.log("Messages deleted");
        }).catch(function(error){
          console.log(error);
        })
        return res.sendStatus(200);
      }
      catch(error) {
        console.log(error)
        return res.sendStatus(500);
      }
      finally{
        console.log('Message Deleted')
      }
}

// delete single text
const deleteText = async function (req,res,next) {
    try {
        // since we want to delete a specific message we need it's id (the same user might send the same message multiple times)
        // we don't need the community since the message_id is unique
        var id = req.params.message_id  
        //console.log(id);
        // finding the message and making sure that the user that wants to delete it is the same user that sent it
        await Chat.findOneAndDelete({_id: id, id_utente: req.loggedUser.id},(err, messages)=> {
          return res.send("eliminato");
        })
      }
      catch(error) {
        console.log(error)
      }
      finally{
        console.log('Message Deleted')
     }
}

// exporting all methods
module.exports = {
    getTexts,
    getUserTexts,
    newText,
    deleteMyTexts,
    deleteText,
};