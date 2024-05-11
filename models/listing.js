const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/* This code snippet is defining a Mongoose schema for a listing object. The schema specifies the
structure of a listing document in a MongoDB collection. Each listing document will have fields for
title (String), image (String), price (Number), location (String), and country (String). */
const listingSchema = new Schema({
  title: String,
  coverageDetails: {
    type: String,
    required: true
  },
  premium: {
    type: Number,
    required: true
  },
  deductible: {
    type: Number,
    required: true
  },
  networkProviders: [String], // Array of strings containing provider names
  enrollmentRequirements: {
    type: String
  },
  additionalInfo: {
    type: String
  },
  price: Number,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


/* This line of code is creating a Mongoose model named `Listing` based on the `listingSchema` schema.
The `mongoose.model` method takes two arguments: the name of the model ('Listings' in this case) and
the schema that defines the structure of the documents that will be stored in the MongoDB collection
associated with this model. */

/* creating a Mongoose model named `Listing` based on the `listingSchema` schema.
The `mongoose.model` method is used to create a model that represents a collection in MongoDB. */
const Listings = mongoose.model("Listings", listingSchema);

//Exporting the model Listings
module.exports = Listings;
