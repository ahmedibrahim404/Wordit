const Contest = require('../models/contest.model');

function createContest(participants, wordsList){

    let contest  = new Contest(wordsList);
    let contestants = [...participants];

    contestants.forEach(player => {
        contest.addContestant(player);
        player.joinContest(contest);
    }); 
    
    return contest;
}

module.exports = { createContest };