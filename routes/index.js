//ROUTES
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//=================================//



//AUTH ROUTES
//show register form
// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//sign up logic
router.post("/register", function(req, res){
     /* eval(require("locus")); */
    //locus stops code so that you can see what variables are available to you. variables have to be declared before eval()

    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === "secretcode123") newUser.isAdmin = true;
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
             //err can tell you what went wrong. err is also an object that has a name and a message. use err.message to display the actual message
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});


//HANDLE LOGIN FORM LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome back to YelpCamp!"
    }), function(req, res){
        req.flash("success", "Welcome back " + req.user.username);
});

//HANDLE LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;
