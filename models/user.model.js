class User {
    
    contestantID;
    contestInside = null;
    
    constructor(contestantID){
        this.contestantID = contestantID;
    }

    getContestantID(){
        return this.contestantID;
    }

    isInContest(){
        return this.contestInside !== null;
    }

    joinContest(contest){
        if(this.isInContest()) return false;
        this.contestInside = contest;
        return true;
    }

    leaveContest(){
        this.contestInside = null;
    }

}


module.exports = User;