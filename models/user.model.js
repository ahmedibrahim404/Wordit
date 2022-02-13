const { MAX_NUMBER_OF_TRIALS } = require("../config");

class User {
    
    contestantID;
    contestInside = null;
    
    numberOfTrials = []; // denotes number of trial in each word in contest
    wordsStates = []; // denotes states of words in contest (0 pending, 1 winner, 2 loser)

    constructor(contestantID){
        this.contestantID = contestantID;
    }

    getContestantID(){
        return this.contestantID;
    }

    isInContest(){
        return this.contestInside !== null;
    }

    getContest(){
        return this.contestInside;
    }

    joinContest(contest){
        if(this.isInContest()) return false;
        this.contestInside = contest;
        this.initContestantValues(contest.getWordsToGuess().length);
        return true;
    }

    initContestantValues(cnt){
        cnt = cnt || 5;
        this.numberOfTrials = Array(cnt).fill(0);
        this.wordsStates = Array(cnt).fill(0);
    }

    canTryWord(wordIndex){
        return wordIndex < this.wordsStates.length && this.wordsStates[wordIndex] === 0;
    }

    getNumberOfTrial(wordIndex){
        return this.numberOfTrials[wordIndex];
    }

    guessWord(wordIndex, wordEntered, wordsControllerInstance){
        let currentContest = this.getContest(), numberOfTrials = this.getNumberOfTrial(wordIndex);
        
        if(numberOfTrials >= MAX_NUMBER_OF_TRIALS || this.wordsStates[wordIndex] !== 0 || !currentContest.isRunning()) return {error:true};
        this.numberOfTrials[wordIndex]++;
        
        let correctWord = currentContest.getWordsToGuess()[wordIndex];
        let guessAnswer = wordsControllerInstance.compareWords(correctWord, wordEntered);
        
        if(wordsControllerInstance.isCorrectGuess(guessAnswer)) this.wordsStates[wordIndex] = 1; // meaning win
        else if(numberOfTrials == MAX_NUMBER_OF_TRIALS) this.wordsStates[wordIndex] = 2;
        
        return { wordIndex, guessAnswer, numberOfTrials };
    }

    leaveContest(){
        this.contestInside = null;
    }

}


module.exports = User;