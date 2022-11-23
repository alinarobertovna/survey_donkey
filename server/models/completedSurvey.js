/*
 * COMP229-015    Group 7
 * Group Project  Part 3 Second Release (Authentication)
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
 * File name:     CompletedSurvey.js
 * Description:   Model Class / Schema for completed surveys
*/

let mongoose  = require('mongoose'); //To get access to the mongoose classes

//Create a model class
let completedSurveyModel = mongoose.Schema({
    title: String,
    userName: String,
    q1: String,
    answer: String,

},
{
    collection: "completedSurveys" 
});

module.exports = mongoose.model('CompletedSurvey', completedSurveyModel);