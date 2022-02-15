const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const config = require('./config');
const PORT = config.PORT || 3000;
const REQ_NUM = config.REQ_NUM || 3; 
const CONTEST_TIME = config.CONTEST_TIME || 60000; // 60 seconds
const cors = require('cors');
app.use(cors());

const { Server } = require("socket.io");

var server = app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});

const io = new Server(server);


const User = require('./models/user.model');
const Contest = require('./models/contest.model');
const PrivateContest = require('./models/privateContest.model.js');
const { createContest } = require('./functionalities/createContest');

const WordsReader = require('./functionalities/words');
let words = new WordsReader();

let currentUsersQueue = new Set();

io.on('connection', (socket) => {
    console.log(socket.id + " User connected!");
    let userID = socket.id;
    let user = new User(userID);

    socket.on('enter-queue', ({username}) => {
        if(user.isInContest()) return;
        io.to(userID).emit('enter-queue-wait');

        user.setUsername(username);
        currentUsersQueue.add(user);
        
        if(currentUsersQueue.size == REQ_NUM){
            let contest = createContest(new Set(currentUsersQueue), words);
            currentUsersQueue.clear();
            contest.start(io);
            setTimeout(() => contest.endContest(io), CONTEST_TIME);
        }
    });

    socket.on('enter-private-queue', ({username, contestCode}) => {
        if(user.isInContest()) return;        
        io.to(userID).emit('enter-queue-wait');

        user.setUsername(username);
        let contest = PrivateContest.getContestFromCode(contestCode); // static method
        if(contest == null) return;

        contest.addPlayerToQueue(user);

        if(contest.getQueue().size == contest.getNumberOfPlayers()){
            contest.start(io);
            setTimeout(() => contest.endContest(io), contest.getDuration());
        }
    });


    socket.on('create-private-contest', ({contestDuration, slotsAvailable, wordsPerContest, trialsPerWord}) => {
        let contest = new PrivateContest(words, wordsPerContest, trialsPerWord, slotsAvailable, contestDuration); 
        io.to(userID).emit('private-contest-code', {contestCode: contest.getContestID()});
    });


    socket.on('enter-word', ({wordEntered, wordIndex}) => {
        if(!user.isInContest() || !user.canTryWord(wordIndex)) return;
        
        let guessAnswer = user.guessWord(wordIndex, wordEntered, words);

        if(guessAnswer.error) return;

        let response = {user:userID,guessAnswer}
        user.getContest().proadcastAllContestants(io, 'player-state-update', response);
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

