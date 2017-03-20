'use strict';

let User = require("../models/user");


//Get - Retorna os dados do usuario da sessao
//========================================
exports.get = (req,res) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.sendStatus(400));
};


//Get List - Retorna lista de usuarios cadastrados
//========================================
exports.list = (req,res) => {

    var params = req._user.role == 'admin'
        ? {}
        : { _id : req._user._id };

    User.find(params)
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400));
};

//Edit - Edita o usuario da sessao
//========================================
exports.edit = (req, res) => {

    let user = {
        name : req.body.name,
        password : req.body.password
    };

    User.update({_id: req.body._id}, {$set: user})
        .then(() => res.json({message:"Usuario salvo!"}))
        .catch(err => res.status(400).json({message:"Erro ao alterar usuario!"}));
};


//Delete - Desativa o usuario da sessao
//========================================
exports.remove = (req,res) => {
    //remove o usuario
    User.remove({ _id : req.params.id })
        .then( () => res.sendStatus(200))
        .catch(err => res.sendStatus(400));
};

// Add - Regitra novos usuarios
//========================================
exports.add = (req, res) => {
    res.json({success: true});
};


