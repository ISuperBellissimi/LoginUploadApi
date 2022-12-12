const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome_utente: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  is_artista: {
    type: Boolean,
    default: false
  }
}, {collection: 'users'});

const User = mongoose.model("User", UserSchema);
module.exports = User;
