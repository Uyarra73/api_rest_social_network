// Import modules
const jwt = require("jwt-simple");
const moment = require("moment");

// Import secret key
const libjwt = require("../services/jwt");
const secret = libjwt.secretKey;

// Authentication function
exports.auth = (req, res, next) => {
    // Check authentication header
    if (!req.headers.authorization) {
      return res.status(403).send({
        status: "error",
        message: "No authentication header",
      });
    }
  
    // Clean and extract the token
    const token = req.headers.authorization.replace(/['"]+/g, "");
  
    try {
      // Verify token
      const payload = jwt.decode(token, secret);
  
      // Check if token is expired
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({
          status: "error",
          message: "Token expired",
        });
      }
  
      // Attach user data to the request object
      req.user = payload;
  
      next();
    } catch (error) {
      return res.status(403).send({
        status: "error",
        message: "Invalid token",
        error: error.message, // Include the error message for debugging
      });
    }
  };
  
