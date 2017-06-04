let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    room_id     : { type : Number, required: true },
    title       : { type : String, required: true },
    description	: { type : String },
    type        : { type : String, enum: ['bedRoom', 'livingRoom', 'kitchen', 'garage', 'bathRoom'], required: true },
    isLightOn   : { type : Boolean, required: true }
});

let Room = mongoose.model('rooms', roomSchema);
module.exports = Room;