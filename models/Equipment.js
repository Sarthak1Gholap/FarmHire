const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String }, // Store the path to the image file
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);
