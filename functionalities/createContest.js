const Contest = require('../models/contest.model');

function createContest(participants, wordsList){

    let words = wordsList.pickWords();

    let contest  = new Contest(words);
    let contestants = [...participants];

    contestants.forEach(player => {
        contest.addContestant(player);
    }); 
    
    return contest;
}

module.exports = createContest;