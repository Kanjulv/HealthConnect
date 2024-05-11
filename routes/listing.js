const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Listings = require("../models/listing.js"); //Requring the model from the listings.js
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const Enrollment = require("../models/enrollment.js");


//Defining a middleware to check for the validation of listing schema from server side
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message.join(","));
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Middleware for authorization
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first :(");
    return res.redirect("/HealthConnect/explore");
  }
  next();
}

//Enrollment get route
router.get("/enroll", ensureAuthenticated, wrapAsync(async(req, res) => {
  let { id } = req.query;
  const enrollment = await Enrollment.findById(id);
  res.render("listings/personalInfo.ejs" , { enrollment });
}));


//enrollment route
router.post(
  "/enroll",
  ensureAuthenticated,
  upload.fields([
    { name: 'ageProof', maxCount: 1 }, // Age Proof Document
    { name: 'addressProof', maxCount: 1 }, // Address Proof Document
    { name: 'identityProof', maxCount: 1 }, // Identity Proof Document
    { name: 'passportPhoto', maxCount: 1 }, // Passport Size Photo
    { name: 'medicalReports', maxCount: 5 } // Medical Reports (allow multiple files)
  ]),
  wrapAsync(async (req, res) => {
    const { fullName, dateOfBirth, gender, email, phoneNumber, address } = req.body;

    // Create new Enrollment object
    const newEnroll = new Enrollment({
      fullName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      address,
      ageProof: req.files['ageProof'][0].path,
      addressProof: req.files['addressProof'][0].path,
      identityProof: req.files['identityProof'][0].path,
      medicalReports: req.files['medicalReports'].map(file => file.path)
    });

    // Set owner ID
    newEnroll.owner = req.user._id;

    // Check if passportPhoto file was uploaded
    if (req.files['passportPhoto'] && req.files['passportPhoto'][0]) {
      newEnroll.passportPhoto = req.files['passportPhoto'][0].path;
    }

    // Save the new enrollment
    let savedEnroll = await newEnroll.save();
    console.log(savedEnroll);
    req.flash("success", "Your enrollment request has been sent to the insurance provider!");
    res.redirect("/HealthConnect/explore");
  })
);

//Index Route: To show all the listings
router.get("/explore", wrapAsync (async (req, res) => {
  const allListings = await Listings.find({});
  res.render("listings/index.ejs", { allListings });
}));

// Search Route: To show details of searched listings
router.get("/explore/search", wrapAsync(async (req, res) => {
  const {title} = req.query;
  const listings = await Listings.find({ title: { $regex: new RegExp(title, "i") } });
  if (!listings.length) {
    req.flash("error", "No such insurance found :(")
    res.redirect("/HealthConnect/explore");
}
  console.log(listings); // Check if listings are fetched correctly
  res.render("listings/search.ejs", { listings });
}));

//Read Route: To show details of indivisual listings
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);


router.get("/",wrapAsync (async (req, res) => {
  res.render("home/home.ejs");
}));


module.exports = router;
