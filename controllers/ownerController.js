const Owner = require('../models/Owner');

// Fetch owner by ID
const getOwnerById = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all owners (accessible by admins)
const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete owner by ID (only for admins)
const deleteOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Owner.findByIdAndDelete(id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getOwnerById, getAllOwners, deleteOwner };
