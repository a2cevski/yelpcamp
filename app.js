const PORT = process.env.PORT || 5000;

var express = require("express"),
  bodyParser = require("body-parser"),
  request = require("request"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  flash = require("connect-flash");

var Campground = require("./models/campgrounds.js"),
  Comment = require("./models/comments.js"),
  User = require("./models/user.js"),
  seedDB = require("./seeds");

var commentRoutes = require("./routes/comments.js"),
  campgroundRoutes = require("./routes/campgrounds.js"),
  indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://ace:ace123123@ds024548.mlab.com:24548/yelp-camp");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

// SEED THE DATABASE AND REMOVE ALL
// seedDB();

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encrypt
passport.deserializeUser(User.deserializeUser()); //decrypt

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.get("/*", function(req, res) {
  res.redirect("/");
});

app.listen(PORT, function() {
  console.log("The time has come to START YELP!");
});
