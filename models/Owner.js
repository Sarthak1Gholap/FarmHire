const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Owner', OwnerSchema);
