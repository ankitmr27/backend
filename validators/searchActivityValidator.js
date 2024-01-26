// validators.js
const { body } = require("express-validator");

// Validator for user registration
module.exports.searchActivityValidator = [body("gadget").trim().notEmpty()];
