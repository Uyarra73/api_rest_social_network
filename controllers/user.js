// Import models and dependencies
const models = require("../models/user");

// Test actions
const userTest = (req, res) => {
  return res.status(200).send({
    message: "Message sent from: controllers/user.js",
  });
};

// User register
const register = (req, res) => {
  // Collect data
  let params = req.body;

  if (!params.name || !params.nick || !params.password || !params.email) {
    return res.status(400).json({
      message: "Incomplete data",
    });
  }

  return res.status(200).json({
    message: "User registered successfully",
    params,
  });
};

// Export actions
module.exports = {
  userTest,
  register,
};
