const Equipment = require('../models/Equipment');
const upload = require('../config/multer');
const checkRole = require('../middleware/authMiddleware');

// Get all equipment (accessible by everyone)
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new equipment (only for owners)
const addEquipment = async (req, res) => {
  const { name, description, rentalPrice, latitude, longitude } = req.body;

  if (!name || !description || !rentalPrice || !latitude || !longitude) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const newEquipment = new Equipment({
      name,
      description,
      rentalPrice,
      location: { latitude, longitude },
      owner: req.user.userId,
      image: req.file?.path,
    });

    await newEquipment.save();
    res.status(201).json({ message: 'Equipment added successfully', newEquipment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete equipment (only for owners)
const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const equipment = await Equipment.findByIdAndDelete(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const hireEquipment = (req, res) => {
  res.status(200).json({ message: 'Equipment hired successfully' });
};


module.exports = { getAllEquipment, addEquipment, deleteEquipment, getEquipmentById, hireEquipment };
