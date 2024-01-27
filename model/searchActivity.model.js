const mongoose = require("mongoose");
require("dotenv").config();

const searchActivitySchema = mongoose.Schema({
  searchTitle: {
    type: String,
    required: true,
  },
  searchResult: {
    publish_date: String,
    pros: String,
    cons: String,
    summary_text: String,
    review_text: [{ review: String, sentiment: String }],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const SearchActivityModel = mongoose.model(
  "SearchActivity",
  searchActivitySchema
);

module.exports = SearchActivityModel;
