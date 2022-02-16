module.exports = {
    PORT: process.env["PORT"],
    REQ_NUM: process.env["REQ_NUM"] || 2,
    WORDS_PER_CONTEST: process.env["WORDS_PER_CONTEST"] || 5,
    MAX_NUMBER_OF_TRIALS: process.env["MAX_NUMBER_OF_TRIALS"] || 3,
    CONTEST_TIME: process.env["CONTEST_TIME"] || 60000,
    PENALITY_PER_WRONG: process.env["PENALITY_PER_WRONG"] || 10,
};