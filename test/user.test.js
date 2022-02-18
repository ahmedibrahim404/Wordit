var assert = require('assert');
const User = require('../models/user.model');
const Contest = require('../models/contest.model');
const WordsReader = require('../functionalities/words');
const { createContest } = require('../functionalities/createContest');


describe('User', async () => {
    let user1 = new User(0, "ahmed");
    let wordsReader = await new WordsReader();
    describe('Check ID', () => {
        it('getContestantID', () => {
            assert.equal(user1.getContestantID(), 0);
        });
    });

    describe('Check username', () => {
        it('getUsername()' , () => {
            assert.equal(user1.getUsername(), "ahmed");
        });
        it('setUsername()' , () => {
            user1.setUsername('alex')
            assert.equal(user1.getUsername(), "alex");
        });
    });

    describe('Check enter/leave contest methods from user', () => {
        it('isInContest() 1', () => {
            assert.equal(user1.isInContest(), false);
        });

        it('isInContest() 2', () => {
            let contest = new Contest(wordsReader, 1);
            assert.equal(user1.joinContest(contest), true);
            assert.equal(user1.isInContest(), true);
        });

        it('isInContest() 3', () => {
            user1.leaveContest();
            assert.equal(user1.isInContest(), false);
        });

    });

    describe('Check contest mechanism from user', () => {
        
        let user2 = new User(1, 'rick');
        
        it('canTryWord', () => {
            assert.equal(user1.canTryWord(0), false);
            assert.equal(user2.canTryWord(0), false);    
        });

        let contest = createContest([user1, user2], wordsReader);
        it('canTryWord', () => {
            assert.equal(user1.canTryWord(0), true);
            assert.equal(user2.canTryWord(0), true);    
        });

    });


});