/*
 * COMP229-015    Group 7
 * Group Project  Part 3 Second Release (Authentication)
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
 * File name:     user.js
 * Description:   Model Class / Schema for users
*/
// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema (
    {
        username:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
       email:
       {
            type: String,
            default: '',
            trim: true,
            required: 'email is required'
       },
       displayName:
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       },
       userType:
       {
            type: String,
       },
       created:
       {
            type: Date,
            default: Date.now,
       },
       update: 
       {
            type: Date,
            default: Date.now,
       }

    },
    {
        collection: "users"
    }
);

//configure options for User Model

let options = ({ missingPasswordError: 'Wrong/Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);