const jwt = require('jwt-simple');

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username       : { type : String, required: true },
    displayName    : { type : String },
    password       : { type : String, trim:true , bcrypt: true },
    auth_code      : { type : String, trim:true , required: true },
    access_token   : { type : String, default: "" }, //access_token
    imageUrl       : { type : String, default: ""},
    role           : { type: String, enum: ['admin', 'user', 'guest'], required: true}
});

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.statics.auth = (username, password, cb) => {
    User.findOne({ username })
        .then(user => {
            let validPassword = user.verifyPasswordSync(password);
            if (!validPassword) {
                throw "Invalid Password"
            }

            let access_token = jwt.encode({
                user_id : user._id,
            }, global.configs.JWT_KEY);

            user.access_token = access_token;

            User.update({_id:user._id}, { $set: { access_token }}, (err, doc) => {
                if(err) throw "Error trying update access_token";

                cb(null, user);
            });
        })
        .catch(err => cb(err, null));
};

let User = mongoose.model('users', userSchema);
module.exports = User;