const express = require("express");
require("dotenv").config();
const protectRoute = require("../middleware/protectRoute");
const {
  getSignup,
  postSignup,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  checkUser,
} = require("../controller/auth.controller");
const extractUserInfo = require("../middleware/currentUser");
const {
  userRegistrationValidator,
} = require("../validators/userRegistrationValidator");
const { userLoginValidator } = require("../validators/userLoginValidator");
const {
  handleValidationErrors,
} = require("../validators/handleValidationErrors");

//auth routes
const authRouter = express.Router();

authRouter
  .route("/signup")
  .post(userRegistrationValidator, handleValidationErrors, postSignup);

authRouter.route("/checkEmail").post(checkUser);

authRouter
  .route("/login")
  .get((req, res) => {
    res.json({ message: "Not allowed" });
  })
  .post(userLoginValidator, handleValidationErrors, loginUser);
authRouter.route("/logout").get(protectRoute, extractUserInfo, logOut);

authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/forgotPassword/:resetToken").post(resetPassword);

module.exports = authRouter;
