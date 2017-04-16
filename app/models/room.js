let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    title       : { type : String, required: true },
    type        : { type : String, enum: ['bedroom', 'livingroom', 'kitchen', 'garage', 'bathroom'], required: true },
    isLightOn   : { type : Boolean, required: true }
});

let Room = mongoose.model('rooms', roomSchema);
module.exports = Room;