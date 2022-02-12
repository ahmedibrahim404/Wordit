const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const config = require('./config');
const PORT = config.PORT || 3000;
const REQ_NUM = config.REQ_NUM || 3; 

const { Server } = require("socket.io");

var server = app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});

const io = new Server(server);

let currentUsersQueue = new Set();

const User = require('./models/user.model');
const Contest = require('./models/contest.model');
const createContest = require('./functionalities/createContest');


io.on('connection', (socket) => {
    console.log(socket.id + " User connected!");
    let userID = socket.id;
    let user = new User(userID);

    socket.on('enter', () => {
        currentUsersQueue.add(user);
        if(currentUsersQueue.size == REQ_NUM){
            let contest = createContest(new Set(currentUsersQueue));
            currentUsersQueue.clear();
            io.emit('start-contest');
            contest.start();
        }
    });

    socket.on('disconnect', () => {
        if(user.isInContest()) user.leaveContest();
        else currentUsersQueue.delete(user);
        console.log(socket.id +  " Disconnected :(");
    });

});

