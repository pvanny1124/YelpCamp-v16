var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: { type: Boolean, default: false }
});

UserSchema.plugin(passportLocalMongoose); //give methods from passport local mongoose to UserSchema
module.exports = mongoose.model("User", UserSchema);