const { CONTEST_TIME, WORDS_PER_CONTEST, MAX_NUMBER_OF_TRIALS } = require('../config');
const generateContestID = require('../functionalities/generateContestID');

class Contest {

    contestID; // unique for each contest
    contestants = new Set();
    wordsToGuess; // array of words
    isRunning; // denotes if contest is still running

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
        this.isRunning = true;

        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            io.to(contestant.getContestantID()).emit('start-contest', {
                contestDuration: CONTEST_TIME,
                numberOfWords: WORDS_PER_CONTEST,
                numberOfTrials: MAX_NUMBER_OF_TRIALS          
            });
        }
    }

    endContest(io){
        this.isRunning = false;

        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            contestant.leaveContest();
            io.to(contestant.getContestantID()).emit('end-contest', {
                scoreboard: this.getScoreboard()
            });
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

    proadcastAllContestants(io, event, params){ // send event over socket to all players within contest
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

    getPlayersWordResult(wordIndex){
        let contestants = [...this.getContestants()];
        let results = {};
        for(let contestant of contestants){
            results[contestant.getContestantID()] = contestant.getPlayerGuessesOfWord(wordIndex);
        }
        return results;
    }

    getDuration(){ // should be overrided for private contest
        return CONTEST_TIME;
    }

    getNumberTrialsPerWord(){ // should be overrided for private contest
        return MAX_NUMBER_OF_TRIALS;
    }

}

module.exports = Contest;