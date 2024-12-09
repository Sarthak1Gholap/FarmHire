const mongoose = require('mongoose');

// MongoDB Connection Function
const connectDB = async () => {
  const retryInterval = 5000; // Time in ms before retrying
  let connected = false;

  // MongoDB URI
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  // Connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Disable auto-creation of indexes in production
    serverSelectionTimeoutMS: 5000, // Timeout for server selection
    socketTimeoutMS: 45000, // Close sockets after timeout
  };

  // Retry Logic for Database Connection
  while (!connected) {
    try {
      await mongoose.connect(mongoURI, options);
      connected = true;
      console.log('✅ MongoDB connected successfully.');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);

      // Exit for critical errors
      if (error.name === 'MongoParseError') {
        console.error('Invalid MongoDB connection string.');
        process.exit(1);
      }

      console.log(`🔄 Retrying connection in ${retryInterval / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }
};

// Event listeners for Mongoose Connection
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to the database.');
});

mongoose.connection.on('error', (error) => {
  console.error('⚠️ Mongoose connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('🔌 Mongoose disconnected. Retrying...');
  connectDB(); // Auto-reconnect on disconnection
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination.');
  process.exit(0);
});

module.exports = connectDB;
