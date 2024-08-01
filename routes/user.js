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

// User profile route
router.get("/profile/:id", check.auth, UserController.profile);

// List route
router.get("/list/:page?", check.auth, UserController.list);

// Update route
router.put("/update", check.auth, UserController.update);

// Export routes
module.exports = router;