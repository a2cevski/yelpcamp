var mongoose 				= require('mongoose'),
	passportLocalMongoose 	= require('passport-local-mongoose');

// var Comment 	= require("./comments.js");


// SCHEMA SETUP
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

