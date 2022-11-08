//Require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//Structure for user
let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COMMENT OUT AFTER ASSIGNMENT SUBMISSION
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DO NOT USER CLEAR TEXT PASSWORD
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE ENCRYPTED PASSWORD TO FOLLOW ALONG WITH PROF TOM'S TUTORIALS
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE ENCRYPTED PASSWORD TO FOLLOW ALONG WITH PROF TOM'S TUTORIALS
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DO NOT USER CLEAR TEXT PASSWORD
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COMMENT OUT AFTER ASSIGNMENT SUBMISSION
       email:
       {
        type: String,
        default: '',
        trim: true,
        required: 'email address is required'
       },
       displayName:
       {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
       },     
       created:
       {
        type: Date,
        default: Date.now
       },
       update:
       {
        type: Date,
        default: Date.now
       }
    },
    {
        collection: "users"
    }
);

//Configure options for User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

//Pass in User model and User object
module.exports.User = mongoose.model('User', User);
