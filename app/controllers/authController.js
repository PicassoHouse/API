'use strict';

const Strategy = require('passport-http-bearer').Strategy;

const User = require('../models/user');


//Passport BearerStrategy
//====================================
exports.AuthStrategy = new Strategy((token, cb) => {
    // User.findOne({access_token: token}, (err, user) => {
    //     if (err) { return cb(err); }
    //     if (!user) { return cb(null, false); }
    //     return cb(null, user);
    // });
    if (token == "123456789") return cb(null, { name : 'Antony' });

    return cb(null, false);
});


//Login Endpoint
//====================================
exports.login = (req, res, next) => {
    res.json({access_token : "123456789"});
};


