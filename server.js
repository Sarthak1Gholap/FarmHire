const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());

// Serve static files (for image uploads or other assets)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes); // Auth and registration
app.use('/api/users', userRoutes); // User profile routes
app.use('/api/workers', workerRoutes); // Worker routes
app.use('/api/farmers', farmerRoutes); // Farmer routes
app.use('/api/owners', ownerRoutes); // Owner routes
app.use('/api/equipment', equipmentRoutes); // Equipment routes

// Error handling middleware (optional but recommended)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
