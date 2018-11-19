var mongoose 	= require('mongoose');

var Campground 	= require("./models/campgrounds.js"),
	Comment 	= require("./models/comments.js");

var data = [
	{
		name: "Baba Planina",
		image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9e2448175103d36c873e2511d112d339&auto=format&fit=crop&w=750&q=80",
		description: 
		"Baba Planina, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	},
	{
		name: "Korab",
		image: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b798852e2af382a7dcaba528c2ea45ae&auto=format&fit=crop&w=500&q=60",
		description: "Korab, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	},
	{
		name: "Galicica",
		image: "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b71591bef8e4fc139f699a923725e32a&auto=format&fit=crop&w=500&q=60",
		description: "Galicica, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	},
	{
		name: "Vodno",
		image: "https://images.unsplash.com/photo-1504870712357-65ea720d6078?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d91ffea4f802668c524df165caf52704&auto=format&fit=crop&w=500&q=60",
		description: "Vodno, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	},
	{
		name: "Shar Planina",
		image: "https://images.unsplash.com/photo-1516600517612-61f2e5eb9182?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=406cffebb5a1c9dd71287e799b6d63ad&auto=format&fit=crop&w=500&q=60",
		description: "Shar Planina, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	},
	{
		name: "Belasica",
		image: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d80a0d3a84491575fcaebee071f0f381&auto=format&fit=crop&w=500&q=60",
		description: "Belasica, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Non blandit massa enim nec dui nunc mattis enim. Augue interdum velit euismod in pellentesque massa placerat. Viverra mauris in aliquam sem fringilla ut. At varius vel pharetra vel turpis nunc eget lorem dolor. Eget dolor morbi non arcu risus quis varius. Ut tellus elementum sagittis vitae. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tortor id aliquet lectus proin nibh. Vitae nunc sed velit dignissim sodales ut eu sem. Libero nunc consequat interdum varius sit amet mattis vulputate. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ornare arcu odio ut sem."
	}
];

function seedDB(){
// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Removed all campgrounds!");
// Remove all comments
			Comment.remove({}, function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log("Removed all comments!");
// Add several campgrounds
// 					data.forEach((camp)=>{
// 						Campground.create(camp, function(err, newCampground){
// 							if(err){
// 								console.log(err);
// 							}
// 							else{
// 								console.log("Added starter camp!");
// // Create a comment for each of the camps
// 								Comment.create({
// 									text: "This place was great but I wish that there was some internetz!",
// 									author: "Homer"
// 									}, function(err, comment){
// 										if(err){
// 											console.log(err);
// 										}
// 										else{
// 											newCampground.comments.push(comment);
// 											newCampground.save();
// 											console.log("Created new comment for starter camp!");						
// 										};
// 									}
// 								);
// 							}
// 						});
// 					});	
				}
			});
		}
	});
};

module.exports = seedDB;

