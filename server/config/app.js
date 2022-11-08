//Main manifest files (central file that links all the site structure)
//Installed third party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//Modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; //For login
let flash = require('connect-flash');

//Database setup
let mongoose = require('mongoose');
let DB = require('./db');

//Point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true}); //Connect to mongoose locally

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:')); //.on is similar to addEventListener
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

//Connect route to app.js
//index = top level site
//users = users or authentication
let indexRouter = require('../routes/index'); //Can omit .js part. Will be used for logging in and out
let usersRouter = require('../routes/users');
let surveysRouter = require('../routes/survey');

//Creates an instance of the express application
let app = express();

// view engine setup
//Set and use gives access to express features
//Path is built in module for nodejs
//Join allows application to search the views (bascially telling the system that our views are inside the view folder)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); //express -e configured view to ejs

//Below are a series of activations
app.use(logger('dev'));
app.use(express.json()); //Data exchange
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); //Static routes - routing automatically made for the public folder
app.use(express.static(path.join(__dirname, '../../node_modules'))); //Include this so that the app will know to also look in node_modules. This way, we do not need to reference node_modules everytime we want to use somewhere from there

//Setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initialize flash
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport user configuration

//Create a User Model instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement a User Authentication Strategy
passport.use(User.createStrategy());

//Serialize and deserialize the User info (encrypt and de-encrypt)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
//Bearer token will be stored in local storage and will indicate whether we are logged in or not
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken(); 
jwtOptions.secretOrKey = DB.Secret;

//Find the user from the jwt_payload based on the bearer token
//If the user is found, return the user
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

//Default routing
//Top level URL
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-list', surveysRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
