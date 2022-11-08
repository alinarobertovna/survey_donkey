//express is used for all routing
let express = require('express');
const { removeData } = require('jquery');
let router = express.Router(); //A router object
let mongoose = require('mongoose'); //So that we can use mongoose commands

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

// //Helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     //Check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         return res.redirect('/login');
//     }
//     next();
// }

//GET Route for the Business Contact List page - this is the READ Operation
router.get('/', surveyController.displaySurveyList);

//GET Route for displaying the Add page - CREATE Operation
router.get('/add', surveyController.displayAddPage);

//POST Route for processing the Add page - CREATE Operation
router.post('/add', surveyController.processAddPage);

//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the business contact list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
router.get('/edit/:id', surveyController.displayEditSurveyPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', surveyController.processEditSurveyPage);

//GET Route to perform Deletion - DELETE Operation
//search for the particular id from the parameters
router.get('/delete/:id', surveyController.performDelete);

//---------------
//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the business contact list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
router.get('/takeSurvey/:id', surveyController.displayTakeSurveyPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/takeSurvey/:id', surveyController.processTakeSurveyPage);
//----------------

//Build up configuration for the router above and export into one single package, so that app.js knows where to look
module.exports = router;

// //Helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     //Check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         return res.redirect('/login');
//     }
//     next();
// }

// //GET Route for the Business Contact List page - this is the READ Operation
// router.get('/', surveyController.displaySurveyList);

// //GET Route for displaying the Add page - CREATE Operation
// router.get('/add', requireAuth, surveyController.displayAddPage);

// //POST Route for processing the Add page - CREATE Operation
// router.post('/add', requireAuth, surveyController.processAddPage);

// //GET Route for displaying the Edit page - UPDATE Operation
// //Pass the information (specifically, id) from the business contact list to the edit page
// //Search for the record with the id (from the parameters) and populate the edit page with the associated details
// router.get('/edit/:id', requireAuth, surveyController.displayEditSurveyPage);

// //POST Route for processing the Edit page - UPDATE Operation
// router.post('/edit/:id', requireAuth, surveyController.processEditSurveyPage);

// //GET Route to perform Deletion - DELETE Operation
// //search for the particular id from the parameters
// router.get('/delete/:id', requireAuth, surveyController.performDelete);

// //Build up configuration for the router above and export into one single package, so that app.js knows where to look
// module.exports = router;