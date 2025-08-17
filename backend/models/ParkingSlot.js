const mongoose = require('mongoose');

const ParkingSlotSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g., A1
  level: { type: String, default: 'G' },
  type: { type: String, enum: ['car', 'bike', 'handicap', 'electric'], default: 'car' },
  hourlyRate: { type: Number, default: 50 },
  isOccupied: { type: Boolean, default: false },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', ParkingSlotSchema);
