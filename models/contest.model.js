const generateContestID = require('../functionalities/generateContestID');

class Contest {

    contestID;
    contestants = new Set();

    startTime;
    duration;
    numberOfPlayers;

    wordsToGuess;

    isRunning;

    constructor(words){
        this.contestID = generateContestID();
        this.wordsToGuess = words;
        return this;
    }

    getContestID(){
        return this.contestID;
    }

    getContestants(){
        return this.contestants;
    }

    addContestant(player){
        this.contestants.add(player);
        player.joinContest(this);
    }

    getWordsToGuess(){
        return this.wordsToGuess;
    }

    start(){
        console.log("Contest Started!!!");
        console.log("GO AND GUESS " + this.getWordsToGuess());
        this.isRunning = true;
    }

    endContest(){
        this.isRunning = false;
    }

    isContestRunning(){
        return this.isRunning;
    }

    getScoreboard(){
        
        let contestants = [...this.getContestants()];
        let scoreboard = [];
        for(let contestant of contestants){
            scoreboard.push([contestant.getUsername(), contestant.getScore()]);
        }

        return scoreboard;

    }

}

module.exports = Contest;