const mongoose = require("mongoose");
require("dotenv").config();
const emailValidater = require("email-validator");
const bcrypt = require("bcrypt");

const db_link = process.env.DB_URL;

// create a default size of 5 database connections
mongoose
  .connect(db_link, { maxPoolSize: 10 })
  .then(function (db) {
    console.log("db connected");
    //console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

// creating schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidater.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
  },
  resetToken: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  mobileNumber: {
    type: Number,
  },
  address: {
    type: {
      city: String,
      country: String,
      state: String,
      pincode: Number,
    },
  },
});

// triggers before save event entry is done
// this can only be accessed while non-array function
userSchema.pre("save", async function () {
  console.log("Before saving in data base:", this);
  this.updatedAt = new Date();
});

// triggers after an save event entry is done
userSchema.post("save", function (doc) {
  console.log("After saving in data base:", doc);
});

//creating a model/collection to populate with data with same schema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
