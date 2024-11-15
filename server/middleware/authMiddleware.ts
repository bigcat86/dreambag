require('dotenv').config();
const jwt = require("jsonwebtoken");

// Use environment variables for secret and expiration
const secret = process.env.JWT_SECRET || "your_secret_key";
const expiration = "24h";

module.exports = {
  // Function for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log("Invalid token", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Proceed to the next middleware or route handler
    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
