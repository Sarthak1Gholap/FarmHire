const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Import multer config
const checkRole = require('../middleware/authMiddleware'); // Import role-check middleware
const {
    addEquipment,
    getAllEquipment,
    getEquipmentById,
    deleteEquipment,
    hireEquipment,
} = require('../controllers/equipmentController');

// Routes for Equipment

// Get all equipment (accessible by everyone)
router.get('/', getAllEquipment);

// Get specific equipment by ID
router.get('/:id', getEquipmentById);

// Add new equipment (only for owners) with image upload
router.post('/', checkRole('owner'), upload.single('image'), addEquipment);

// Hire equipment (only for farmers)
router.post('/hire', checkRole('farmer'), hireEquipment);

// Delete equipment (only for owners)
router.delete('/:id', checkRole('owner'), deleteEquipment);

module.exports = router;
