'use strict';

const Room = require("../models/room");

//Get Rooms - List rooms
//========================================
exports.getRooms = (req,res) => {
    Room.find({})
        .then(docs => res.json(docs))
        .catch(err => res.sendStatus(400));
};
