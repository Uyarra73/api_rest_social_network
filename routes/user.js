const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Define routes
router.get("/user-test", UserController.userTest);

// Define user register route
router.post("/register", UserController.register);

// Define user login route
router.post("/login", UserController.login);

// Export routes
module.exports = router;