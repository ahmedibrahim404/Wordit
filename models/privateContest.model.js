const { WORDS_PER_CONTEST, REQ_NUM, CONTEST_TIME, MAX_NUMBER_OF_TRIALS } = require("../config");
const Contest = require("./contest.model");

class PrivateContest extends Contest {

    numberOfPlayers;
    numberOfWords;
    duration;
    trialsPerWord;

    static contests = new Map();

    static getContestFromCode(code){
        if(PrivateContest.contests.has(code)) return PrivateContest.contests.get(code);
        else return null;
    }

    constructor(wordsList, wordsCount, trialsPerWord, playersCount, duration){
        super(wordsList, wordsCount);
        PrivateContest.contests.set(this.getContestID(), this); // call static method

        this.numberOfWords = wordsCount || WORDS_PER_CONTEST;
        this.numberOfPlayers = playersCount || REQ_NUM;
        this.duration = duration || CONTEST_TIME;
        this.trialsPerWord = trialsPerWord || MAX_NUMBER_OF_TRIALS;
    }

    getQueue(){
        return this.contestants;
    }

    addPlayerToQueue(player){
        super.addContestant(player);
        player.joinContest(this);
    }


    getNumberOfPlayers(){
        return this.numberOfPlayers;
    }

    start(io){
        this.isRunning = true;

        let contestants = [...this.getContestants()];
        for(let contestant of contestants){
            io.to(contestant.getContestantID()).emit('start-contest', {
                contestDuration: this.duration,
                numberOfWords: this.numberOfWords,
                numberOfTrials: this.trialsPerWord          
            });
        }
    }


    endContest(io){
        PrivateContest.contests.delete(this.getContestID());
        super.endContest(io);
    }

    getDuration(){
        return this.duration || CONTEST_TIME;
    }
    
    getNumberTrialsPerWord(){
        return this.trialsPerWord || MAX_NUMBER_OF_TRIALS;
    }

}

module.exports = PrivateContest;