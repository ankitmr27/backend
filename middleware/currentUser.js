const jwt = require("jsonwebtoken");

const extractUserInfo = async (req, res, next) => {
  try {
    // Get the token from the request header or query parameter
    const token = req.cookies.isLoggedIn;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Verify the token and decode object {iat;string,payload:{id:string, email:email}}
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace 'your-secret-key' with your actual secret key

    // Attach the user information to the request object
    req.user = decoded.payload;

    // Move to the next middleware
    next();
  } catch (error) {
    return await res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error });
  }
};

module.exports = extractUserInfo;
