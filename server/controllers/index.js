//Just logic - no routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Enable jwt
let DB = require('../config/db');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', page: 'home'});
}
