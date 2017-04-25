'use strict';

const Room = require("../models/room");

//Get Rooms - List rooms
//========================================
exports.listRooms = (req,res) => {
    // Room.find({})
    //     .then(docs => res.json(docs))
    //     .catch(err => res.sendStatus(400));
    res.json([
		{_id: "123", title : 'Cozinha', description: 'Cozinha', type: 'kitchen', isLightOn : true },
		{_id: "123", title : 'Sala de Estar', description: 'Sala de estar', type: 'livingRoom', isLightOn : false },
		{_id: "123", title : 'Garagem', description: 'Garagem', type: 'garage', isLightOn : true },
		{_id: "123", title : 'Quarto 1', description: 'Quarto das crianças', type: 'bedRoom', isLightOn : false },
		{_id: "123", title : 'Quarto 2', description: 'Quarto das crianças', type: 'bedRoom', isLightOn : true }
    	]);
};
