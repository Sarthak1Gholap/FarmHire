const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Worker = require('../models/Worker');
const Owner = require('../models/Owner');

// @desc Register a new user
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role, hourlyRate, location } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new user in the User collection
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Add the user to the specific role collection
    if (role === 'farmer') {
      const farmer = new Farmer({ userId: newUser._id, name, email });
      await farmer.save();
    } else if (role === 'worker') {
      // Ensure required fields are provided for Worker
      if (!hourlyRate || !location || !location.latitude || !location.longitude) {
        return res.status(400).json({
          message: 'Please provide hourlyRate and valid location {latitude, longitude} for a worker.',
        });
      }

      const worker = new Worker({
        userId: newUser._id,
        name,
        email,
        hourlyRate,
        location,
      });
      await worker.save();
    } else if (role === 'owner') {
      const owner = new Owner({ userId: newUser._id, name, email });
      await owner.save();
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get user profile by ID
// @route GET /api/users/profile/:id
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update user profile
// @route PUT /api/users/profile/:id
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure that users can only update their own profile
    if (user._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // You may also handle password change logic here

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  getUserProfile,
  updateUserProfile,
};
