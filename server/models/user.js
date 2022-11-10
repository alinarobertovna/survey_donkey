/* CONSIDER REMOVING THIS FILE FOR NOW
 *
 *
 *
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
 * File name:     user.js
 * Description:   Contains models for User Model
*/

/*
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
*/