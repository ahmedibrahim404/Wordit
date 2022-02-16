const { MAX_NUMBER_OF_TRIALS, PENALITY_PER_WRONG } = require("../config");

class User {
    
    contestantID;
    username;
    contestInside = null;
    
    numberOfTrials = []; // denotes number of trial in each word in contest
    wordsStates = []; // denotes states of words in contest (0 pending, 1 winner, 2 loser)

    playerGuesses = []; // stores all guesses of player during the game

    score;

    constructor(contestantID, username=null){
        this.setUsername(username);
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

    clearPlayersGuesses(cnt){
        for(let i=0;i<cnt;i++){
            this.playerGuesses.push([]);
            for(let j=0;j<MAX_NUMBER_OF_TRIALS;j++){
                this.playerGuesses[i].push([]);
                for(let k=0;k<5;k++){
                    this.playerGuesses[i][j].push(0);
                }
            }
        }
    }


    initContestantValues(cnt){
        cnt = cnt || 5;
        this.numberOfTrials = Array(cnt).fill(0);
        this.wordsStates = Array(cnt).fill(0);
        this.score = 0;
        this.playerGuesses = [];
        this.clearPlayersGuesses(cnt);
    }

    canTryWord(wordIndex){
        return wordIndex < this.wordsStates.length && this.wordsStates[wordIndex] === 0;
    }

    getNumberOfTrial(wordIndex){
        return this.numberOfTrials[wordIndex];
    }

    setUsername(username=null){
        if(username == null) username = "User_" + Math.floor(Math.random()*1000);
        this.username = username;
    }

    getUsername(){
        return this.username;
    }

    addScore(numberOfTrials){
        this.score += Math.max(0, 100 - numberOfTrials * PENALITY_PER_WRONG);
    }

    getScore(){
        return this.score;
    }

    guessWord(wordIndex, wordEntered, wordsControllerInstance){
        let currentContest = this.getContest(), numberOfTrials = this.getNumberOfTrial(wordIndex);
        let maxNumberOfTrials = currentContest.getNumberTrialsPerWord();

        if(numberOfTrials >= maxNumberOfTrials || this.wordsStates[wordIndex] !== 0 || !currentContest.isContestRunning()) return {error:true};
        this.numberOfTrials[wordIndex]++;
        
        let correctWord = currentContest.getWordsToGuess()[wordIndex];
        let guessAnswer = wordsControllerInstance.compareWords(correctWord, wordEntered);
        
        this.playerGuesses[wordIndex][numberOfTrials] = [...guessAnswer];

        if(wordsControllerInstance.isCorrectGuess(guessAnswer)){ // meaning win
            this.wordsStates[wordIndex] = 1;
            this.addScore(numberOfTrials);
        } else if(numberOfTrials == maxNumberOfTrials) this.wordsStates[wordIndex] = 2; // lose
        
        return { wordIndex, guessAnswer, numberOfTrials };
    }

    leaveContest(){
        this.contestInside = null;
    }

    getPlayerGuessesOfWord(wordIndex){
        //console.log(this.playerGuesses);
        return this.playerGuesses[wordIndex];
    }

}


module.exports = User;