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

/************************************
 * Arduino > API
 ***********************************/

// hasDetectedPresence
// @param req.param.room_id : String
//========================================
exports.hasDetectedPresence = (req,res) => {
    //TODO: this method should be called when detect Presence in room
    //should update light status for room_id
    //should add LightHistory log
};

// hasDetectedRain
//========================================
exports.hasDetectedRain = (req,res) => {
    //TODO: this method should be called when detect rain
};

// hasReceivedAuthCode : called when receive AuthCode from membrana keyboard
// @param req.param.auth_code : String
//========================================
exports.hasReceivedAuthCode = (req,res) => {
    //TODO: should auth user by auth_code and verify if user have permission to access house
    // if user have permission to access the house and house is locked then set house unlocked
    //if user have permission to access then should add operation to AccessHistory
};


/************************************
 * App > API
 ***********************************/

// turn light on
// @param req.param.room_id : String
// @param req.param.on : Boolean | true if is to turn light on
//========================================
exports.turnLightOn = (req,res) => {
    //TODO: should turn light On/Off
    res.sendStatus(200);
};

// open garage
// @param req.param.open : Boolean | true if is to open garage
//========================================
exports.openGarage = (req,res) => {
    //TODO: should open/close garage
    res.sendStatus(200);
};

// openWindow
// @param req.param.open : Boolean | true if is to open the window and false otherwise
//========================================
exports.openWindows = (req,res) => {
    //TODO: should lock/unlock house
    res.sendStatus(200);
};

// lockHouse
// @param req.param.lock : Boolean | true if is to lock the house and false otherwise
//========================================
exports.lockHouse = (req,res) => {
    //TODO: should lock/unlock house
};

// GET getHouseInfo
//========================================
exports.getHouseInfo = (req,res) => {
    res.json({
        owner : {_id: 'asdf', displayName: "Antony Alkmim", username: "antonyalkmim"},
        isLocked : true
    });
};

