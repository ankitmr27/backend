const express = require("express");
require("dotenv").config();
const protectRoute = require("../middleware/protectRoute");
const extractUserInfo = require("../middleware/currentUser");
const {
  postSearchActivity,
  deleteAllSearchActivity,
  getSearchActivityPaginated,
  deleteSearchActivityById,
} = require("../controller/searchActivity.controller");
const {
  searchActivityValidator,
} = require("../validators/searchActivityValidator");
const {
  handleValidationErrors,
} = require("../validators/handleValidationErrors");
const searchRouter = express.Router();

searchRouter
  .route("/")
  .get(protectRoute, extractUserInfo, getSearchActivityPaginated)
  .post(
    protectRoute,
    extractUserInfo,
    searchActivityValidator,
    handleValidationErrors,
    postSearchActivity
  )
  .delete(protectRoute, extractUserInfo, deleteAllSearchActivity);

searchRouter
  .route("/id")
  .delete(protectRoute, extractUserInfo, deleteSearchActivityById);

module.exports = searchRouter;
