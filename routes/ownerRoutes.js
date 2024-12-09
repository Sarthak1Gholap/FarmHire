const express = require('express');
const checkRole = require('../middleware/authMiddleware');  // Middleware to check user role
const {
  getOwnerById,
  getAllOwners,
  deleteOwner,
} = require('../controllers/ownerController');
const router = express.Router();

// Routes for Owner
// Get owner by ID
router.get('/:id', checkRole('admin', 'owner'), getOwnerById);

// Get all owners (accessible by admins)
router.get('/', checkRole('admin'), getAllOwners);

// Delete owner by ID (only for admins)
router.delete('/:id', checkRole('admin'), deleteOwner);

module.exports = router;
