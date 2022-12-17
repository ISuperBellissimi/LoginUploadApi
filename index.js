const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const uri = process.env.PRIVATE_KEY;

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        uri,
        {dbName: 'SoundMatch',
         useNewUrlParser: true,
         useUnifiedTopology: true
        },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));



const songRoutes = require('./routes/song'); //to import the routes/song.js
const authRoutes = require('./routes/auth'); //to import the routes/auth.js
const chatRoutes = require('./routes/chat'); //to import the routes/chat.js

app.use('/song', songRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

io.on('connection', () =>{
    console.log('a user is connected')
})


app.listen(3000, () =>
  console.log('Demo app listening on port 3000!'),
);
