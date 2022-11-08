let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//Create a reference to the model
let Survey = require('../models/survey');
let CompletedSurvey = require('../models/completedSurvey');

module.exports.displaySurveyList = (req,res,next) => { //Look at the top level route
    Survey.find((err, surveyList) => { //When request is received, send a response
        //If there is an error, return surveyList
        if(err)
        {
            return console.error(err); //Generate an error on the server side
        }
        else
        {

            // response render
            //'businessContact/list' is the view. {} is the object being pushed to the view
            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName: ''}); //Pass surveyList object into the surveyList property
        }
    }).sort({name:1}); //Chain this to .find to sort the name column in ascending order
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey',
    displayName: req.user ? req.user.displayName: ''})
}

module.exports.processAddPage = (req, res, next) => {
    //Create newBook object
    let newSurvey = Survey({
        "surveyName": req.body.name,
        "q1":req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Refresh the book list
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //Show the edit view
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit,
            displayName: req.user ? req.user.displayName: ''})
        }
    });
}

module.exports.processEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "surveyName": req.body.name,
        "q1":req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    //Search for _id
    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}

//-------------
module.exports.displayTakeSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToTake) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //Show the edit view
            res.render('survey/takeSurvey', {title: 'Take Survey', survey: surveyToTake,
            displayName: req.user ? req.user.displayName: ''})
        }
    });
}

module.exports.processTakeSurveyPage = (req, res, next) => {

    let newCompletedSurvey = CompletedSurvey({
        "surveyName": req.body.surveyName,
        "userName": req.body.userName,
        "answer": req.body.optQ1,
    });

    CompletedSurvey.create(newCompletedSurvey, (err, CompletedSurvey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Refresh the book list
            res.redirect('/survey-list');
        }
    });
}
//--------------