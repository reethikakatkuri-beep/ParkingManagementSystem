const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  ticket:  { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true, index: true },
  amount:  { type: Number, required: true, min: 0 },
  method:  { type: String, enum: ['upi', 'cash', 'card'], default: 'upi' },
  status:  { type: String, enum: ['pending', 'success', 'failed'], default: 'success' },
  txnRef:  { type: String, default: '' },
  paidAt:  { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
