const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');  // Ensure correct import
const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post('/register', registerUser);

// @route POST /api/auth/login
// @desc Login user and return a token
router.post('/login', loginUser);

module.exports = router;
