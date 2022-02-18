const fs = require('fs');
const path =require('path');
const config = require('../config');
const WORDS_PER_CONTEST = config.WORDS_PER_CONTEST || 2;

class WordsReader {

    words = [];

    constructor(){
        fs.readFile(path.join(__dirname , '/../words.txt'), 'utf8' , (err, data) => {
            if (err){
                console.log(err);
                return;
            }
            this.words = data.split(' ');
        });       
    };

    pickWords(numberOfWords=null){
        let wordsChosen = new Set();
        numberOfWords = numberOfWords || WORDS_PER_CONTEST;
        while(wordsChosen.size < numberOfWords){
            // pick random index from 0 to words.length-1
            let index = Math.floor(Math.random()*this.words.length);
            wordsChosen.add(this.words[index]);
        }
        return [...wordsChosen];
    }

    compareWords(correctWord, guessWord){
        
        let ans = [];

        for(let charIdx in correctWord){
            if(charIdx < guessWord.length && correctWord[charIdx] == guessWord[charIdx]) ans.push(1); // green correct guess
            else if(charIdx < guessWord.length && correctWord.search(guessWord[charIdx]) != -1) ans.push(2); // yellow correct char in wrong place
            else ans.push(3); // red wrong guess
        }

        return ans;
    }

    isCorrectGuess(guessAnswer){
        for(let val of guessAnswer){
            if(val != 1) return false;
        }
        return true;
    }
    
}




module.exports = WordsReader;