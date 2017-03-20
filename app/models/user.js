let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username            : { type : String, required: true },
    displayName      : { type : String },
    password        : { type : String, trim:true , bcrypt: true },
    createdAt      : { type : Date, default: Date.now },
    updatedAt    : { type : Date, default: Date.now },
    access_token    : { type : String, default: "" }, //access_token
    imageUrl        : { type : String, default: ""},
    status            : { type: String, enum: ['enabled', 'disabled']}
});

userSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('users', userSchema);
