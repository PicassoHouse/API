let mongoose = require('mongoose');

//USER
let userSchema = require("./schemas/user.js");
exports.User = mongoose.model('users', userSchema);
