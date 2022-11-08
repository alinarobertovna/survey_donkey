//Install express
//Create a new router
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
let businessContactIndexController = require('../controllers/surveyIndex.js');

// /* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for displaying the Login page */
router.get('/login', businessContactIndexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', businessContactIndexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;


//PREVIOUS CODE FOR REFERENCE

// /* GET home page. */
// //Router is triggered when root is accessed (e.g., http://localhost:3000/)
// //res.render
//     //Render the page
//     //Look inside index.ejs file (index.ejs is a template)
//     //Pass an object with a property of title and value of 'Express' (This will change the content of %= title % in the index.ejs file)
//     //Different values are being injected into the index.ejs template below
// router.get('/', function(req, res, next) {
//   res.render('index',   { title: 'Home'});
// });

// /* GET Home page. */
// router.get('/home', function(req, res, next) {
//   res.render('index',   { title: 'Home'});
// });

// /* GET About Us page. */
// router.get('/about', function(req, res, next) {
//   res.render('about',   { title: 'About'});
// });

// /* GET Projects page. */
// router.get('/projects', function(req, res, next) {
//   res.render('projects',   { title: 'Projects'});
// });

// /* GET Services page. */
// router.get('/services', function(req, res, next) {
//   res.render('services',   { title: 'Services'});
// });

// /* GET Contact Us page. */
// router.get('/contact', function(req, res, next) {
//   res.render('contact',   { title: 'Contact'});
// });

// module.exports = router;
