function generateContestID(){
    return 'Contest_' + Math.floor(Math.random() * 100);
}

module.exports = generateContestID;