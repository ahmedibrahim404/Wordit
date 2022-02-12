class User {
    
    userID;
    contestInside = null;
    
    constructor(userID){
        this.userID = userID;
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