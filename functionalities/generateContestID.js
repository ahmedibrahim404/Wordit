const uuid = require("uuid")


function generateContestID(){
    return uuid.v4();
}

module.exports = generateContestID;