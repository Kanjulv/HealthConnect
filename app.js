/* We don't want to push our .env file on github i.e. production phase. Therefoe if the phase is not production require .env  */
if(process.env.NODE_ENV != 'production'){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');  //requiring connect-mongo package from npm to store session info like cookies of any user
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use("/public",express.static(__dirname + "/public"));

const dbUrl = process.env.ATLASDB_URL;

//Set up MongoDB connection
main()
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

//Connect Mongo basic setup: docs
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Connection Error in Mongo session Store");
});

//Setting up express-server
const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());

/* Setting up a local strategy for
user authentication using Passport.js. */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
/* ` passport.serializeUser(User.serializeUser());` is a method used in Passport.js for session
management and user authentication. It is used to serialize the user instance into the session. This
method is typically called during the login process to store the user's information in the session.
The `serializeUser` method is responsible for determining which data of the user object should be
stored in the session. */
passport.deserializeUser(User.deserializeUser());
/* `passport.deserializeUser(User.deserializeUser());` is a method used in Passport.js for session
management and user authentication. It is used to deserialize the user instance from the session. */

//Middlewares for defining locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Middlewares for usage of router files
app.use("/HealthConnect", listingsRouter);
app.use("/", userRouter);

//Defining a middleware for page not found
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//Defining a middleware for a validation or any other error
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen("8080", () => {
  console.log("Listening on port 8080");
});

//toLocaleString("en-IN")
//passport.authenticate not working
//Redirection to th original page after login
