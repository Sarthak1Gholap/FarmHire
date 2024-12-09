const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Worker = require('../models/Worker');
const Owner = require('../models/Owner');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role, hourlyRate, location } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Create and save role-specific user
    if (role === 'farmer') {
      const farmer = new Farmer({ userId: newUser._id, name, email });
      await farmer.save();
    } else if (role === 'worker') {
      if (!hourlyRate || !location || !location.latitude || !location.longitude) {
        return res.status(400).json({ message: 'Please provide hourlyRate and valid location for a worker.' });
      }

      const worker = new Worker({ userId: newUser._id, name, email, hourlyRate, location });
      await worker.save();
    } else if (role === 'owner') {
      const owner = new Owner({ userId: newUser._id, name, email });
      await owner.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };

