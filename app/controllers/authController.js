'use strict';

const Strategy = require('passport-http-bearer').Strategy;

const User = require('../models/user');


//Passport BearerStrategy
//====================================
exports.AuthStrategy = new Strategy((token, cb) => {
    User.findOne({ access_token: token }, (err, user) => {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
    });
});


//Login Endpoint
//====================================
exports.login = (req, res, next) => {
    let { username, password } = req.body;

    User.auth(username, password, (err, user) => {
        if (err) return res.json({success : false, message : "Usuário ou Senha Inválidos"});

        let access_token = user.access_token;
        res.json({ success: true, access_token });
    });
};


