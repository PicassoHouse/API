const mongoose = require('mongoose');

let lightHistorySchema = new mongoose.Schema({
    user        : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    date        : { type : Date, required: true },
    isLightOn   : { type : Boolean, required: true },
    room_id        : { type: Number, required: true }
});

let LightHistory = mongoose.model('light_history', lightHistorySchema);
module.exports = LightHistory;