const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const check = require('../middlewares/auth');

// Define routes
router.get("/user-test",check.auth, UserController.userTest);

// Define user register route
router.post("/register", UserController.register);

// Define user login route
router.post("/login", UserController.login);

// Export routes
module.exports = router;