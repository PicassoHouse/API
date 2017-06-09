/**
 * Brigde between Hardware and API
 *
 * Implements the communication between hardwire and database:
 *      - Send request to arduino Ethernet Interface
 *      - Receive request from arduino Ethernet Interface
 *
 *  Endpoints: endpoints to maintain the communication between arduino and API
 *      Arduino > API:
 *          hasDetectedPresence
 *          hasDetectedRain
 *          hasReceivedAuthCode
 *      Apps > API:
 *          turnLightOn
 *          openGarage
 *          openWindow
 *          lockHouse
 */

'use strict';

const configs = require('../../configs.json');
const House = require('./PHouseInterface');
const HouseModel = require("../models/house");
const User = require('../models/user');
const Room = require('../models/room');
const LightHistory = require('../models/lightHistory');
const AccessHistory = require('../models/accessHistory');


exports.init = (req, res, next) => {

    //only admins can add user
    if(req.user.role !== 'admin')
        return res.sendStatus(400);

    let {username, password, displayName, imageUrl, role, auth_code} = req.body;

    HouseModel.findOne()
        .then(result => {
            if(result) { return res.sendStatus(400); }

            User.create({ username, password, displayName, imageUrl, role , auth_code})
                .then((user) => {
                    HouseModel.create({ owner : user._id, isLocked : false})
                        .then((house) => res.json(user))
                        .catch(err => res.sendStatus(400));
                });

            Room.create({room_id : 1, title: "Sala de Estar", description: "Sala de visitas", type: 'livingRoom', isLightOn: false });
            Room.create({room_id : 2, title: "Garagem", description: "Garagem", type: 'garage', isLightOn: false });
            Room.create({room_id : 3, title: "Cozinha", description: "Cozinha", type: 'kitchen', isLightOn: false });
            Room.create({room_id : 4, title: "Quarto", description: "Quarto", type: 'bedRoom', isLightOn: false });
            
        })
        .catch(err => res.sendStatus(400));

};


/************************************
 * Arduino > API
 ***********************************/

exports.authHouseDevice = (req, res, next) => {
    if(req.query.device_id != configs.DEVICE_ID) {
        return res.sendStatus(400);
    }
    next();
};

// hasDetectedPresence
// @param req.param.room_id : String
// @param req.param.on : Bool
//========================================
exports.hasDetectedPresence = (req,res) => {

    let {room_id, on} = req.query;

    HouseModel.findOne()
        .then(result => {
            //se detectar presenca e a casa estiver trancada entao devera soar o alarme
            if (result.isLocked && on) {
                //TODO: enviar alerta push pelo aplicativo
                House.setBuzzerOn(true);
                return res.sendStatus(200);
            }

            Room.update({room_id: room_id}, {$set : {isLightOn : on}}).then(() => {
                House.turnLightOn(room_id, on);
                LightHistory.create({ date: Date.now(), isLightOn: on, room_id : room_id })
                    .then(h => res.sendStatus(200))
                    .catch(err => res.sendStatus(400));
            });
        })
        .catch(err => res.sendStatus(400));

};

// hasDetectedRain
//========================================
exports.hasDetectedRain = (req,res) => {
    House.openWindow(1, false); //fechar janelas quando detectar chuva
    res.sendStatus(200);
};

// hasReceivedAuthCode : called when receive AuthCode from membrana keyboard
// @param req.param.auth_code : String
//========================================
exports.hasReceivedAuthCode = (req,res) => {

    let {auth_code} = req.query;

    User.findOne({auth_code:auth_code})
        .then(result => {
            if(!result) throw "Usuário nao existe!";

            HouseModel.update({}, {$set: {isLocked : false}}); //destrancar casa
            AccessHistory.create({ user : result._id, date : Date.now() }); //salvar historico de acesso
            res.sendStatus(200)
        })
        .catch(err => res.sendStatus(200));
};


/************************************
 * App > API
 ***********************************/

// turn light on
// @param req.param.room_id : String
// @param req.param.on : Boolean | true if is to turn light on
//========================================
exports.turnLightOn = (req,res) => {
    let {room_id, on} = req.query;
    House.turnLightOn(room_id, on);

    Room.update({room_id: room_id}, {$set : {isLightOn : on}}).then(() => {
        House.turnLightOn(room_id, on);
        LightHistory.create({ date: Date.now(), isLightOn: true, room_id : room_id })
            .then(h => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
    });
};

// open garage
// @param req.param.open : Boolean | true if is to open garage
//========================================
exports.openGarage = (req,res) => {
    House.openGarage(req.query.open);
    res.sendStatus(200);
};

// openWindow
// @param req.param.open : Boolean | true if is to open the window and false otherwise
//========================================
exports.openWindows = (req,res) => {
    House.openWindow(1, req.query.open);
    res.sendStatus(200);
};

// lockHouse
// @param req.body.lock : Boolean | true if is to lock the house and false otherwise
//========================================
exports.lockHouse = (req,res) => {

    let {lock} = req.query;

    HouseModel.update({}, {$set: {isLocked : lock}})
        .then(result => res.sendStatus(200))
        .catch(err => res.sendStatus(400));
};

// GET getHouseInfo
//========================================
exports.getHouseInfo = (req,res) => {
    HouseModel.findOne()
        .populate('owner')
        .then(result => res.json(result))
        .catch(err => res.sendStatus(400).json(err));
};

