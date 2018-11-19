var express			= require('express'),
	router			= express.Router();

var Campground 		= require("../models/campgrounds.js"),
	middleware		= require("../middleware/index.js");

// GET Route /CAMPGROUNDS - INDEX ROUTE
router.route("/")
.get(function(req, res){
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
})

// POST Route /CAMPGROUNDS - CREATE ROUTE
.post(middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user.id,
		username: req.user.username
	}
	var newCampground = {
		name: name, 
		image: image,
		description: description,
		author: author
	};
	if(name && image){
		Campground.create(newCampground, function(err,newlyCreatedCampground){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	}
	else
		res.send("Some error!");
});

// GET Route /CAMPGROUNDS/NEW - NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
}); 

// GET Route /CAMPGROUNDS/:ID - SHOW ROUTE
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// GET Route /CAMPGROUNDS/:ID/EDIT - EDIT PAGE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		}
		else{
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

// PUT Route /CAMPGROUNDS - EDIT CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {
		name: name, 
		image: image,
		description: description,
		author: author
	};
	if(name && image){
		Campground.findByIdAndUpdate(req.params.id, newCampground, function(err,newlyCreatedCampground){
			if(err){
				console.log(err)
			}
			else{
				res.redirect("/campgrounds");
			}
		});
	}
	else
		res.send("Some error!");
});

// GET Route /CAMPGROUNDS/:ID/DELETE - DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		}
		else{
			res.redirect("/campgrounds")
		}
	});
});

module.exports = router;