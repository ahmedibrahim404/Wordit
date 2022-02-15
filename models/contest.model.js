const generateContestID = require('../functionalities/generateContestID');

class Contest {

    contestID;
    contestants = new Set();
    wordsToGuess;
    isRunning;

    constructor(wordsList, wordsCount){
        this.contestID = generateContestID();
        this.wordsToGuess = wordsList.pickWords(wordsCount);
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
    }

    getWordsToGuess(){
        return this.wordsToGuess;
    }

    start(io){
        console.log("Contest Started!!!");
        console.log("GO AND GUESS " + this.getWordsToGuess());
        this.isRunning = true;

        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            io.to(contestant.getContestantID()).emit('start-contest');
        }
    }

    endContest(io){
        this.isRunning = false;

        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            contestant.leaveContest();
            io.to(contestant.getContestantID()).emit('end-contest');
        }

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

    proadcastAllContestants(io, event, params){
        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            io.to(contestant.getContestantID()).emit(event, params);
        }
    }

    sendAllPlayersIDs(io){
        this.proadcastAllContestants(io, 'players-joined', {
            users:[...this.getContestants()].map((contestant) => contestant.getContestantID())
        });
    }

}

module.exports = Contest;