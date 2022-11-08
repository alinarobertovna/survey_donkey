let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

//helper func for guard purposes
function requireAuth(req, res, next) {
    //check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
let surveyController = require('../controllers/survey');

/* GET Route for the Book List page - Read Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying Add page - Create Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Route for processing Add page - Create Operation */
router.post('/add', requireAuth, surveyController.processAddPage);

/* GET Route for displaying Edit page - Update Operation */
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST Route for processing Edit page - Update Operation */
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET to perform Deletion - Delete Operation */
router.get('/delete/:id', requireAuth, surveyController.performDelete);

module.exports = router;