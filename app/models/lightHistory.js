const mongoose = require('mongoose');

let lightHistorySchema = new mongoose.Schema({
    user        : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    date        : { type : Date, required: true },
    isLightOn   : { type : Boolean, required: true },
    room        : { type: mongoose.Schema.Types.ObjectId, ref: 'rooms', required: true }
});

let LightHistory = mongoose.model('light_history', lightHistorySchema);
module.exports = LightHistory;