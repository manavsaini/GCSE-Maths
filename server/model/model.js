const { Number } = require('mongoose');
const mongoose = require('mongoose');
/*
var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})
*/

var questionBankSchema = new mongoose.Schema({
    question : {
        type : String,
        required: true
    },
    choices : {
        type: [String],
        required: true,
    },
    hints : String,
    correctChoice : {
        type: String,
        required: true,
    },
    rewardPoints : Number,
    flag: String,
    counter: Number,
    pointsEarned : Number,
    userSolution : String
})

var quizSchema = new mongoose.Schema({
    topic : {
        type : String,
        required: true
    },
    questionBank : [questionBankSchema]
})

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    password : {
        type: String,
        required: true
    },
    totalRewardPoints : Number,
    quiz: [quizSchema]
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;