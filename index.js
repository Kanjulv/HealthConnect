if(process.env.NODE_ENV != 'production'){
  require("dotenv").config();
}
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listings = require("./models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

//Set up MongoDB connection
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listings.deleteMany({});  //Delete the values present in the database earlier
    initData.data = initData.data.map((obj) => ({
      ...obj, owner: "6632040da20abc8015e01492"
    }));
    await Listings.insertMany(initData.data); //Insert the values present in the new database
    console.log("Data Initialisation Succesfull");
};
initDB();

