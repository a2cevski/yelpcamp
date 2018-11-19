var Campground 		= require("../models/campgrounds.js"),
	Comment			= require("../models/comments.js");


var middlewareObj = {};

// FUNCTION THAT CHECKS USER AUTHENTICATION
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

// FUNCTION THAT CHECKS USER AUTHORIZATION TO CHANGE CAMPGROUND
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
    			req.flash("error", "Campground unexpected error!");
				res.redirect("/campgrounds")
			}
			else{
				if(foundCampground.author.id.equals(req.user.id)){
					next();
				}
				else{
    				req.flash("error", "You need permission to do that!");
					res.redirect("back");
				}
			}
		});
	}
	else{
    	req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

// FUNCTION THAT CHECKS USER AUTHORIZATION TO CHANGE COMMENT
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundCampground){
			if(err){
    			req.flash("error", "Campground unexpected error!");
				res.redirect("/campgrounds")
			}
			else{
				if(foundCampground.author.id.equals(req.user.id)){
					next();
				}
				else{
    				req.flash("error", "You need permission to do that!");
					res.redirect('back');
				}
			}
		});
	}
	else{
    	req.flash("error", "You need to be logged in to do that");
		res.redirect('/login');
	}
};








module.exports = middlewareObj;