const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const config = require('./config');
const PORT = config.PORT || 3000;
const REQ_NUM = config.REQ_NUM || 3; 
const CONTEST_TIME = config.CONTEST_TIME || 10000; // 10 seconds

const { Server } = require("socket.io");

var server = app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});

const io = new Server(server);

let currentUsersQueue = new Set();

const User = require('./models/user.model');
const Contest = require('./models/contest.model');
const createContest = require('./functionalities/createContest');

const WordsReader = require('./functionalities/words');
let words = new WordsReader();

io.on('connection', (socket) => {
    console.log(socket.id + " User connected!");
    let userID = socket.id;
    let user = new User(userID);

    socket.on('enter-queue', () => {
        if(user.isInContest()) return;
        currentUsersQueue.add(user);
        if(currentUsersQueue.size == REQ_NUM){
            let contest = createContest(new Set(currentUsersQueue), words);
            
            let contestants = [...currentUsersQueue];
            currentUsersQueue.clear();

            for(let contestant of contestants){
                io.to(contestant.getContestantID()).emit('start-contest', {
                    
                });
            }

            contest.start();

            setTimeout(() => {
                contest.endContest();
                for(let contestant of contestants){
                    contestant.leaveContest();
                    io.to(contestant.getContestantID()).emit('end-contest', {

                    });
                }
            }, CONTEST_TIME);    

        }
    });


    socket.on('enter-word', ({wordEntered, wordIndex}) => {
        if(!user.isInContest() || !user.canTryWord(wordIndex)) return;
        let guessAnswer = user.guessWord(wordIndex, wordEntered, words);
        if(guessAnswer.error) return;
        io.to(userID).emit('enter-word-response', guessAnswer);
    });

    socket.on('get-scoreboard', () => {
        if(!user.isInContest()) return;
        let contest = user.getContest();
        io.to(userID).emit('send-scoreboard', {scoreboard:contest.getScoreboard()});
    });


    socket.on('disconnect', () => {
        if(user.isInContest()) user.leaveContest();
        else currentUsersQueue.delete(user);
        console.log(socket.id +  " Disconnected :(");
    });

});

