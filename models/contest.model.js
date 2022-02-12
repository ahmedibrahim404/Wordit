const generateContestID = require('../functionalities/generateContestID');

class Contest {

    contestID;
    contestants = new Set();

    startTime;
    duration;
    numberOfPlayers;


    constructor(){
        this.contestID = generateContestID();
        return this;
    }

    getContestID(){
        return this.contestID;
    }

    getContestants(){
        return this.players;
    }

    addContestant(player){
        this.contestants.add(player);
        player.joinContest(this);
    }

    start(){
        console.log("Contest Started!!!");
    }


}

module.exports = Contest;