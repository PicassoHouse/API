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
};

// hasDetectedRain
//========================================
exports.hasDetectedRain = (req,res) => {
    //TODO: this method should be called when detect rain
};

// hasReceivedAuthCode : called when receive AuthCode from membrana keyboard
//========================================
exports.hasDetectedRain = (req,res) => {
    //TODO: this method should be called when detect rain
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
};

// open garage
// @param req.param.open : Boolean | true if is to open garage
//========================================
exports.openGarage = (req,res) => {
    //TODO: should open/close garage
};

// openWindow
// @param req.param.room_id : String
// @param req.param.open : Boolean | true if is to open the window and false otherwise
//========================================
exports.openWindow = (req,res) => {
    //TODO: should lock/unlock house
};

// lockHouse
// @param req.param.lock : Boolean | true if is to lock the house and false otherwise
//========================================
exports.lockHouse = (req,res) => {
    //TODO: should lock/unlock house
};

