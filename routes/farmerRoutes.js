const express = require('express');
const checkRole = require('../middleware/authMiddleware');  // Middleware to check user role
const {
  getFarmerById,
  getAllFarmers,
  deleteFarmer,
} = require('../controllers/farmerController');
const router = express.Router();

// Routes for Farmer
// Get a farmer by ID
router.get('/:id', checkRole('owner', 'admin'), getFarmerById);

// Get all farmers (accessible by admin or owner)
router.get('/', checkRole('owner', 'admin'), getAllFarmers);

// Delete a farmer by ID (accessible by owner or admin)
router.delete('/:id', checkRole('owner', 'admin'), deleteFarmer);

module.exports = router;
