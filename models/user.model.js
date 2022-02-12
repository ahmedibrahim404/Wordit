class User {
    
    userID;
    contestInside = null;
    
    constructor(userID){
        this.userID = userID;
    }

    isInContest(){
        return this.contestInside !== null;
    }

    joinContest(contestID){
        if(this.isInContest()) return false;
        this.contestInside = contestID;
        return true;
    }

}


module.exports = User;