let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    status          : { type : Boolean, required: true },
    name            : { type : String, required: true },
    email           : { type : String, unique: true },
    password        : { type : String, trim:true , bcrypt: true },
    createdAt      : { type : Date, default: Date.now },
    updatedAt    : { type : Date, default: Date.now },
    access_token    : { type : String, default: "" }, //access_token
    imageUrl        : { type : String, default: ""},
    role            : { type: String, enum: ['admin', 'user']}
});

userSchema.plugin(require('mongoose-bcrypt'));

module.exports = userSchema;
