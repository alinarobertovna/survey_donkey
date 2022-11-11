/*
 * COMP229-015    Group 7
 * Group Project  Part 2 First Release
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
 * File name:     index.js
 * Description:   Router for all pages
*/

//Install express
//Create a new router
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

module.exports = router;

//router.get / router.post for ea page go here