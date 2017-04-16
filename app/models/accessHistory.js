const mongoose = require('mongoose');

let accessHistorySchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    date : { type : Date, required: true },
});


let AccessHistory = mongoose.model('access_history', accessHistorySchema);
module.exports = AccessHistory;