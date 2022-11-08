let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    status: String
},
{
    collection: "survey-list"
});

module.exports = mongoose.model('Survey', surveyModel);