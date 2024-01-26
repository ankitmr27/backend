const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressListEndpoints = require("express-list-endpoints");
app.use(express.json());
// allows cross origin resource sharing means any other webapge can access my server resources
// Set up CORS middleware with specific origin(s)
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const authRouter = require("./router/auth.router");
const HomeRouter = require("./router/home.router");
const searchRouter = require("./router/search.router");

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

app.use("/home", HomeRouter);
app.use("/auth", authRouter);
app.use("/searchActivity", searchRouter);

// Log all registered routes
// console.log(expressListEndpoints(app));

module.exports = app;
