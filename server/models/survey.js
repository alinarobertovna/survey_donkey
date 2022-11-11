/*
 * COMP229-015    Group 7
 * Group Project  Part 2 First Release
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Akash Arora – 300849838
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Nithiyavany Vijai – 301212774
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * 
 * File name:     survey.js
 * Description:   Model Class / Schema for surveys
*/

let mongoose  = require('mongoose'); //To get access to the mongoose clases

//Create a model class
let surveyModel = mongoose.Schema({
    //Properties/structure of the DB

    title: String,
    q1: String,
    q1Opt1: String,
    q1Opt2: String,
    q1Opt3: String,
    q1Opt4: String,
    
},
{
    collection: "surveys" 
});


module.exports = mongoose.model('Survey', surveyModel);