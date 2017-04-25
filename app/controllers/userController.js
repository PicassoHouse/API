'use strict';

let User = require("../models/user");


//Get - get session user info
//========================================
exports.currentUser = (req,res) => res.json(req.user);

//Get - get session user info
//========================================
exports.get = (req,res) => {

    //only admins can find any user
    if(req.user._id !== req.params.id && req.user.role !== 'admin')
        return res.sendStatus(400);

    User.findOne({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.sendStatus(400));
};


//Get List - list registered users
//========================================
exports.list = (req,res) => {

    const params = req.user.role === 'admin'
        ? {}
        : { _id : req.user._id };

    User.find(params)
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400));
};

//Delete - delete users
//========================================
exports.remove = (req,res) => {

    //only admins can delete users
    if(req.user.role !== 'admin')
        return res.sendStatus(400);

    if(req.user._id == req.params.id) {
        return res.status(400).json({
            success: false, 
            message: 'Não é possível remover o seu próprio usuário!'
        });
    }

    User.remove({ _id : req.params.id })
        .then(() => res.sendStatus(200))
        .catch(err => res.sendStatus(400));
};

// Add - add users
//========================================
exports.add = (req, res) => {

    //only admins can add user
    if(req.user.role !== 'admin')
        return res.sendStatus(400);

    let {username, password, displayName, imageUrl, role, auth_code} = req.body;

    User.create({ username, password, displayName, imageUrl, role , auth_code})
        .then((user) => res.json(user))
        .catch(err => res.sendStatus(400));
};


