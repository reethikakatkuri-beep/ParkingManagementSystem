const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plate:     { type: String, required: true, uppercase: true, trim: true, index: true },
  ownerName: { type: String, required: true, trim: true },
  type:      { type: String, enum: ['car', 'bike', 'van', 'truck'], default: 'car' },
  contact:   { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
