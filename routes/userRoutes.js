const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { registerUser, loginUser } = require('../controllers/authController'); // Import login function
const checkRole = require('../middleware/authMiddleware');
const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post('/register', registerUser);

// @route POST /api/auth/login
// @desc Login user and return a token
router.post('/login', loginUser); // Ensure loginUser is defined and imported correctly

// @route GET /api/users/profile/:id
// @desc Get user profile by ID
router.get('/profile/:id', checkRole('owner', 'farmer', 'worker'), getUserProfile);

// @route PUT /api/users/profile/:id
// @desc Update user profile
router.put('/profile/:id', checkRole('owner', 'farmer', 'worker'), updateUserProfile);

module.exports = router;
