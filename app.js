const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const PORT = require('./config').PORT || 3000;

const { Server } = require("socket.io");

var server = app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});

const io = new Server(server);


io.on('connection', (socket) => {
    console.log(socket.id + " User connected!");
    socket.on('disconnect', () => {
        console.log(socket.id +  " Disconnected :(");
    });
});
