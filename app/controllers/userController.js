'use strict';

let User = require("../models/user");


//Get - Retorna os dados do usuario da sessao
//========================================
exports.get = (req,res) => {

    //apenas admin pode buscar qualquer usuario
    if(req.user._id !== req.params.id && req.user.role !== 'admin')
        return res.sendStatus(400);

    User.findOne({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.sendStatus(400));
};


//Get List - Retorna lista de usuarios cadastrados
//========================================
exports.list = (req,res) => {

    const params = req.user.role == 'admin'
        ? {}
        : { _id : req.user._id };

    User.find(params)
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400));
};

//Delete - Desativa o usuario da sessao
//========================================
exports.remove = (req,res) => {

    //apenas admin pode excluir outros usuarios
    if(req.user.role !== 'admin')
        return res.sendStatus(400);

    User.remove({ _id : req.params.id })
        .then(() => res.sendStatus(200))
        .catch(err => res.sendStatus(400));
};

// Add - Regitra novos usuarios
//========================================
exports.add = (req, res) => {

    //apenas admin pode registrar outros usuarios
    if(req.user.role !== 'admin')
        return res.sendStatus(400);

    let {username, password, displayName, status, imageUrl, role} = req.body;

    User.create({username, password, displayName, status, imageUrl, role})
        .then((user) => res.json(user))
        .catch(err => res.sendStatus(400));
};


