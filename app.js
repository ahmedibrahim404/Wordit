const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const config = require('./config');
const cors = require('cors');
const { Server } = require("socket.io");

const User = require('./models/user.model');
const PrivateContest = require('./models/privateContest.model.js');
const { createContest } = require('./functionalities/createContest');
const WordsReader = require('./functionalities/words');

const PORT = config.PORT || 3000;
const REQ_NUM = config.REQ_NUM; 
const CONTEST_TIME = config.CONTEST_TIME;

app.use(cors());

var server = app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});

const io = new Server(server);


let words = new WordsReader();
let currentUsersQueue = new Set();

io.on('connection', (socket) => {
    let userID = socket.id;
    let user = new User(userID);

    socket.on('enter-queue', ({username}) => {
        if(user.isInContest()) return;
        io.to(userID).emit('enter-queue-wait', {userID});

        user.setUsername(username);
        currentUsersQueue.add(user);
        
        // if number of users in queue is enough to start contest
        if(currentUsersQueue.size == REQ_NUM){
            let contest = createContest(new Set(currentUsersQueue), words);
            currentUsersQueue.clear();
            contest.sendAllPlayersIDs(io);
            contest.start(io);
            setTimeout(() => contest.endContest(io), CONTEST_TIME);
        }
    });

    socket.on('enter-private-queue', ({username, contestCode}) => {
        if(user.isInContest()) return;        
        io.to(userID).emit('enter-queue-wait', {userID});

        user.setUsername(username);
        let contest = PrivateContest.getContestFromCode(contestCode); // static method
        if(contest == null) return;

        contest.addPlayerToQueue(user);

        if(contest.getQueue().size == contest.getNumberOfPlayers()){
            contest.sendAllPlayersIDs(io);
            contest.start(io);
            setTimeout(() => contest.endContest(io), contest.getDuration());
        }
    });


    socket.on('create-private-contest', ({contestDuration, slotsAvailable, wordsPerContest, trialsPerWord}) => {
        let contest = new PrivateContest(words, wordsPerContest, trialsPerWord, slotsAvailable, contestDuration); 
        io.to(userID).emit('private-contest-code', {contestCode: contest.getContestID()});
    });


    socket.on('enter-word', ({wordEntered, wordIndex}) => { // whenever any play attempts a guess
        if(!user.isInContest() || !user.canTryWord(wordIndex)) return;
        
        let guessAnswer = user.guessWord(wordIndex, wordEntered, words); // get guess result

        if(guessAnswer.error) return; // if cannot guess [trials are over], skip

        let response = {user:userID,guessAnswer}
        user.getContest().proadcastAllContestants(io, 'player-state-update', response); // send update to all players
    });

    socket.on('get-scoreboard', () => {
        if(!user.isInContest()) return;
        let contest = user.getContest();
        io.to(userID).emit('send-scoreboard', {scoreboard:contest.getScoreboard()});
    });

    socket.on('get-players-word-result', ({wordIndex}) => { // get players results[guesses] for specific word
        if(!user.isInContest()) return;
        let contest = user.getContest();
        io.to(userID).emit('send-players-word-result', {results:contest.getPlayersWordResult(wordIndex)});
    });


    socket.on('disconnect', () => {
        if(user.isInContest()) user.leaveContest(); // if in contest, leave it
        else if(currentUsersQueue.has(user)) currentUsersQueue.delete(user);
    });

});

