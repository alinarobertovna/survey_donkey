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
 * File name:     survey.js
 * Description:   Controllers for survey page - enables add survey, edit, delete, take and view
*/
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//enable jwt
let jwt = require("jsonwebtoken");
let DB = require("../config/db");

//Create a reference to the model
let Survey = require('../models/survey');
let CompletedSurvey = require('../models/completedSurvey');

module.exports.displaySurveyList = (req, res, next) => { 
    Survey.find((err, surveyList) => { 
        if (err) {
            return console.error(err); 
        } else {
            //res.render survey/list and send to it title, SurveyList, displayName, userType, and username 
            res.render('survey/list', {
                title: 'Surveys',
                SurveyList: surveyList,
                displayName: req.user ? req.user.displayName : '',
                userType: req.user? req.user.userType : '',
                username: req.user? req.user.username: ''
            }); 
        }
    }).sort({
        name: 1
    }); 
};

module.exports.displayAddPage = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (req.user.userType == "Survey Taker") {
          req.flash(
            "VerificationMessage",
            "Verification Error, This user cannot create a survey!"
          );
          return res.redirect("/");
        }
        if (req.user.userType == "Survey Creator") {
          res.render("survey/add", {
            title: "Add Survey",
            displayName: req.user ? req.user.displayName : "",
          });
        }
      })(req, res, next);
}

module.exports.processAddPage = (req, res, next) => {
    //MongoDB stores dates and times in ISO format, for example, 2022-12-07T05:00:00.000+00:00
        //Breakdown of the format: yyyy-mm-ddThh:mm:ss.sss+00:00
            //T is a time delimiter 
            //sss is for milliseconds
            //+00:00 denotes the time zone as UTC 
            //MongoDB by default stores dates and times in UTC and will output dates and times relative to UTC 
            //For the example given above, the output will look like the following: Wed Dec 07 2022 00:00:00 GMT-0500 (Eastern Standard Time)

    //date variable stores the survey's expiration date in a new Date object (which have built-in methods for time and date manipulations)
    date = new Date(req.body.endDate);
    
    //.getTime() returns the survey's expiration date in number of milliseconds since January 1, 1970 UTC
    //.getTimezoneOffset() returns the difference between UTC and the local time in minutes (positive for for those behind UTC, negative for those ahead of UTC)
        //240 mintes (4 hours) during daylight saving time
        //300 minutes (5 hours) during standard time (i.e., not daylight saving time)
    //.getTimezoneOffset() * 60 seconds * 1000 milliseconds to convert UTC to EDT or EST (in milliseconds since January 1, 1970 UTC)
    date = date.getTime() + (date.getTimezoneOffset()*60*1000);

    //Create newSurvey object
    let newSurvey = Survey({
        "surveyCreator": req.user.displayName,
        "title": req.body.title,
        "description": req.body.description,
        "endDate": date, //Write the converted time and date to the MongoDB cloud
        "q1": req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Show the edit view
            res.render('survey/edit', {
                title: 'Edit Survey',
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    date = new Date(req.body.endDate);
    date = date.getTime() + (date.getTimezoneOffset()*60*1000);

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "description": req.body.description,
        "endDate": date,
        "q1": req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    //Search for _id
    Survey.updateOne({
        _id: id
    }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/survey-list');
        }
    });
}


module.exports.displayTakeSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToTake) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Show the edit view
            res.render('survey/takeSurvey', {
                title: 'Take Survey',
                survey: surveyToTake,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processTakeSurveyPage = (req, res, next) => {

    let newCompletedSurvey = CompletedSurvey({
        "title": req.body.title,
        "userName": req.body.userName,
        "answer": req.body.optQ1,
    });

    CompletedSurvey.create(newCompletedSurvey, (err, CompletedSurvey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Refresh the survey list
            res.redirect('/survey-list');
        }
    });
}
