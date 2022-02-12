const fs = require('fs');
const path =require('path');
const config = require('../config');
const WORDS_PER_CONTEST = config.WORDS_PER_CONTEST || 2;

class WordsReader {

    words;

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
    
}




module.exports = WordsReader;