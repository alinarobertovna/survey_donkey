/*
 * COMP229-015    Group 7
 * Group Project  Part 4 Final Release
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * Akash Arora – 300849838
 * Nithiyavany Vijai – 301212774
 * 
 * File name:     surveyshortAnswers.js
 * Description:   Model Class / Schema for surveys
*/

let mongoose  = require('mongoose'); //To get access to the mongoose clases

//Create a model class
let surveyShortAnswersModel = mongoose.Schema({
    //Properties/structure of the DB
    surveyType: String,
    surveyCreator: String,
    title: String,
    description: String,
    endDate: Date,
    q1: String,
},
{
    collection: "surveys" 
});


module.exports = mongoose.model('ShortAnswerSurveys', surveyShortAnswersModel);