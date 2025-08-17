const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  slot:     { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  vehicle:  { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  entryTime:{ type: Date, default: Date.now },
  exitTime: { type: Date },
  status:   { type: String, enum: ['open', 'closed'], default: 'open' },
  amount:   { type: Number, default: 0 },
  paid:     { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
