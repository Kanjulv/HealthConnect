const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    // Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.That's why we will add only email to our schema
    email:{
        type: 'string',
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);