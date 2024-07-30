// Import models and dependencies
const user = require("../models/user");
const bcrypt = require("bcrypt");

// Test actions
const userTest = (req, res) => {
  return res.status(200).send({
    message: "Message sent from: controllers/user.js",
  });
};

// User register
const register = async (req, res) => {
  try {
    // Collect data
    let params = req.body;

    // Validate required fields
    if (!params.name || !params.nick || !params.password || !params.email) {
      return res.status(400).json({
        message: "Incomplete data",
      });
    }

    // Create a new user
    let user_to_save = new user(params);

    // User duplicated check
    const users = await user.find({
      $or: [
        { email: user_to_save.email.toLowerCase() },
        { nick: user_to_save.nick.toLowerCase() },
      ],
    });

    if (users.length >= 1) {
      return res.status(409).json({
        status: "success",
        message: "User already exists",
      });
    }

    // Hash the password
    user_to_save.password = await bcrypt.hash(user_to_save.password, 10);

    // Save the new user to the database
    const savedUser = await user_to_save.save();

    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in the server",
      error: error.message,
    });
  }
};

// User login

const login = async (req, res) => {
  // Get data from server
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Incomplete data",
    });
  }

  // Find user by email
  user.findOne({ email: params.email }).select({"password": 0}).exec().then((user) => {
    if (!user) {
      return res.status(404).send({
        status: "Error",
        message: "The user doesn't exist",
      });
    }

    // Check if the password is correct

    // Generate token

    // Return data

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      user: user,
      token: "your_token_here",
    });
  });
};

// Export actions
module.exports = {
  userTest,
  register,
  login,
};
