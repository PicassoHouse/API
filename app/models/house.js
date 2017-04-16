let mongoose = require('mongoose');

let houseSchema = new mongoose.Schema({
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    role  : { type: Boolean, required: true}
});


let House = mongoose.model('house', houseSchema);
module.exports = House;