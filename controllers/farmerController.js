const Farmer = require('../models/Farmer');

// Fetch farmer by ID
const getFarmerById = async (req, res) => {
  const { id } = req.params;

  try {
    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all farmers (accessible by admins or owners)
const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete farmer by ID (only for admins or owners)
const deleteFarmer = async (req, res) => {
  const { id } = req.params;

  try {
    const farmer = await Farmer.findByIdAndDelete(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.status(200).json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFarmerById, getAllFarmers, deleteFarmer };
