const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//Route to Logout user
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now logged out!");
    res.redirect("/HealthConnect");
  });
});

//Sign Up page routes
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      //Adding functionality of user getting logged in automically if he signs in
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to HealthConnect");
        res.redirect("/HealthConnect");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

//Login Page routes
router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

/* This code snippet is defining a POST route for the "/login" endpoint. When a POST request is made to
"/login", it first uses the `passport.authenticate("local")` middleware to authenticate the user's
credentials. If the authentication fails, it will redirect the user back to the "/login" page and
display a flash message with the error. */
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to HealthConnect!");

    // Check if a redirect URL is saved
    let redirectUrl = res.locals.redirectUrl;

    // If no redirect URL is found, determine origin and set default redirect
    if (!redirectUrl) {
        const referrer = req.headers.referer; // Get referrer header
        if (referrer && referrer.includes("/HealthConnect")) {
          // User was likely on the home page
          redirectUrl = "/HealthConnect";
        } else {
          // User was likely on another page (assume explore for now)
          redirectUrl = "/HealthConnect/explore";
        }
    }

    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
);


module.exports = router;
