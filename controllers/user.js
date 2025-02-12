// Import models and dependencies
const user = require("../models/user");
const bcrypt = require("bcrypt");
//const mongoosePagination = require("mongoose-pagination");

// Import services
const jwt = require("../services/jwt");

// Test actions
const userTest = (req, res) => {
  return res.status(200).send({
    message: "Message sent from: controllers/user.js",
    user: req.user,
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
  user
    .findOne({ email: params.email })
    .select({ password: 0 })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          status: "Error",
          message: "The user doesn't exist",
        });
      }

      // Check if the password is correct

      // Generate token
      const token = jwt.createToken(user);

      // Return data

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          nick: user.nick,
        },
        token: token,
      });
    });
};

// User profile

const profile = async (req, res) => {
  // Get user from request
  let id = req.params.id;

  // Check user params
  user
    .findById(id)
    .select({ password: 0, role: 0 })
    .exec()
    .then((userProfile) => {
      if (!userProfile) {
        return res.status(404).send({
          status: "Error",
          message: "User not found",
        });
      }

      // Return user data
      // Show follows information
      return res.status(200).json({
        status: "success",
        message: "User profile",
        user: userProfile,
      });
    });
};

// List method
const list = async (req, res) => {
  let page = 1;
  if (req.params.page) {
    page = parseInt(req.params.page);
  }

  let itemsPerPage = 5;

  try {
    // Usar paginate para obtener usuarios y total de elementos
    const result = await user.paginate({}, { page, limit: itemsPerPage, sort: { _id: 1 } });
    const { docs: users, totalDocs: totalItems } = result;

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No users found",
      });
    }

    // Enviar respuesta con los datos de usuarios y paginación
    return res.status(200).json({
      status: "success",
      message: "Users list",
      users,
      totalItems,
      currentPage: page,
      itemsPerPage,
      totalPages: result.totalPages
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the server",
      error: error.message
    });
  }
};

// User data update
const update = (req, res) => {
  // Get user from request
  let userIdentity = req.user;

  // Delete data we don't need  
  delete userIdentity.iat;
  delete userIdentity.exp;
  delete userIdentity.role;
  delete userIdentity.image;

  // Check if the user already exists
  let userToUpdate = req.body;

  // User duplicated check
  user.find({
    $or: [
      { email: userToUpdate.email.toLowerCase() },
      { nick: userToUpdate.nick.toLowerCase() },
    ],
  }).exec().then(users => {
    if (!user) {
      return res.status(404).send({
        status: "Error",
        message: "The user doesn't exist",
      });
    }

    let userIsset = false;
    users.forEach(user => {
      if (user && user._id != userIdentity.id) {
        userIsset = true;
      }
    });

    if(userIsset){
      return res.status(200).send({
        status: "success",
        message: "User already exists",
      });
    }
  });



  // Hash the password
  if(userToUpdate.password){
    userToUpdate.password = bcrypt.hash(userToUpdate.password, 10);
  }
  

  // Save the new user to the database
  const updatedUser = userToUpdate.save(); 

  return res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user: userIdentity,
  });
}


// Export actions
module.exports = {
  userTest,
  register,
  login,
  profile,
  list,
  update,
};
