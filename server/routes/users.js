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
 * File name:     users.js
 * Description:   Router for registered users
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
