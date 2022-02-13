const generateContestID = require('../functionalities/generateContestID');

class Contest {

    contestID;
    contestants = new Set();

    startTime;
    duration;
    numberOfPlayers;

    wordsToGuess;

    constructor(words){
        this.contestID = generateContestID();
        this.wordsToGuess = words;
        return this;
    }

    getContestID(){
        return this.contestID;
    }

    getContestants(){
        return this.players;
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
    }


}

module.exports = Contest;