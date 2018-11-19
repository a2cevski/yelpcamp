var express			= require('express'),
	router			= express.Router({mergeParams: true});

var Campground 		= require("../models/campgrounds.js"),
	Comment			= require("../models/comments.js"),
	middleware		= require("../middleware/index.js");

// GET Route /CAMPGROUNDS/:ID/COMMENTS/NEW - NEW COMMENT ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: foundCampground});
		}
	});
});

// POST Route /CAMPGROUNDS/:ID/COMMENTS - CREATE COMMENT ROUTE
router.post("/", middleware.isLoggedIn,function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
 			Comment.create(req.body.comment, function(err, newComment){
				if(err){
    				req.flash("error", "Unexpected error!");
					res.redirect("/campgrounds");
				}
				else{
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					foundCampground.comments.push(newComment);
					foundCampground.save();
    				req.flash("success", "Successfully added comment!");
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	});
});

// GET Route /CAMPGROUNDS/:ID/COMMENTS/:COMMENTS_ID/EDIT - EDIT PAGE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back")
		}
		else{
        	res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// PUT Route /CAMPGROUNDS/:ID/COMMENTS/:COMMENTS_ID - EDIT COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
 			Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, changedComment){
				if(err){
					console.log(err);
					res.redirect("/campgrounds");
				}
				else{
					changedComment.save();
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	});
});

// GET Route /CAMPGROUNDS/:ID/COMMENTS/:COMMENTS_ID - DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err)
			res.redirect("/campgrounds/" + req.params.id)
		}
		else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});


module.exports = router;