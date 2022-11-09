let mongoose  = require('mongoose'); //To get access to the mongoose clases

//Create a model class
let surveyModel = mongoose.Schema({
    //Properties/structure of the DB
    // name: String,
    // number: String,
    // email: String,
    title: String,
    q1: String,
    q1Opt1: String,
    q1Opt2: String,
    q1Opt3: String,
    q1Opt4: String,
    // q2: String,
    // q2Opt1: String,
    // q2Opt2: String,
    // q2Opt3: String,
    // q2Opt4: String,
},
{
    collection: "surveys" //Like a table in the database (db.business_contact.find())
});

//Returns a whole model, not just a class - this means all of the mongo commands (e.g., insert, find, remove) come from businessContactModel
module.exports = mongoose.model('Survey', surveyModel);