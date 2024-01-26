// validators.js

const { body } = require("express-validator");

// Validator for user registration
module.exports.userRegistrationValidator = [
  body("name").trim().notEmpty(),
  body("email").trim().notEmpty().isEmail(),
  body("password").trim().notEmpty().isLength({ min: 6 }),
  body("confirmPassword").trim().notEmpty().isLength({ min: 6 }),
];
