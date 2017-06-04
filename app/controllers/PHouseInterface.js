/**
 * PHouse: House Interface methods
 *  setBuzzerOn
 *  turnLightOn
 *  openGarage
 *  openWindow
 *  showDisplayMessage
 */

'use strict';

const Request = require('request');

const PH_URL = "http://192.168.1.11";

exports.setBuzzerOn = (on) => Request.get(`${PH_URL}/set_buzzer_on?param=_${on ? 1 : 0}`);

exports.turnLightOn = (roomId, on) => Request.get(`${PH_URL}/turn_ligth_on?param=_${roomId}&${on ? 1 : 0}`);

exports.openGarage = (open) => Request.get(`${PH_URL}/open_garage?param=_${open ? 1 : 0}`);

exports.openWindow = (windowId, open) => Request.get(`${PH_URL}/open_window?param=_${windowId}&${open ? 1 : 0}`);

exports.showDisplayMessage = (message) => { };



