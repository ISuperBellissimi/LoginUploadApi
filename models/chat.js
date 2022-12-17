// chat globale
const mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    nome_utente: String,
    id_utente: String,
    message: String,
    community_id: String,
    /* created_at: {type: Date, default: Date.now} */
}, {collection: 'chats'});

const Chat = mongoose.model("SoundMatch", ChatSchema);
module.exports = Chat;