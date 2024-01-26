const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// protect route middleware so just use (req,res,next) to make any function middleware
// next is keyword to pass the control of the req-res cycle
async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.isLoggedIn;
    //console.log(token);
    if (token) {
      let isValidToken = jwt.verify(token, JWT_KEY);
      if (isValidToken) {
        next();
      } else {
        return await res.json({ message: "user not verified" });
      }
    } else {
      res.status(401);
      return await res.json({ message: "operation not allowed" });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(401);
    return res.json({ message: "Action not allowed" });
  }
}

module.exports = protectRoute;
