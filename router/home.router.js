const express = require("express");
const homeRouter = express.Router();

homeRouter.route("/").get(async (req, res) => {
  return res.json({ message: "Hello from home" });
});

module.exports = homeRouter;
