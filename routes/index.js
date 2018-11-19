var express			= require('express'),
	router			= express.Router(),
	passport 		= require('passport');

var	User			= require("../models/user.js");

router.get("/", function(req, res){
	res.redirect("/campgrounds");
});

// GET Route /REGISTER - NEW USER ROUTE
router.get("/register", function(req, res){
	res.render("auth/register");
});

// POST Route /REGISTER - REGISTER USER ROUTE
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
    		req.flash("error", "Unexpected error! " + err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
    		req.flash("success", "Your profile has been created! " + newUser.username);
			res.redirect("/campgrounds");
		});
	});
});

// GET Route /LOGIN - LOGIN ROUTE
router.get("/login", function(req, res){
	res.render("auth/login");
});

// POST Route /LOGIN - LOGIN USER ROUTE
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
    // req.flash("success", "Welcome back, " + newUser.username);
});

// GET Route /LOGOUT - LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
    req.flash("success", "Bye bye!");
	res.redirect("back");
});

module.exports = router;