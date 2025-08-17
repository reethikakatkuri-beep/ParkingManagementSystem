const Ticket = require('../models/Ticket');
const ParkingSlot = require('../models/ParkingSlot');
const Vehicle = require('../models/Vehicle');
const Payment = require('../models/Payment');

exports.checkin = async (req, res) => {
  try {
    const { slotId, vehicleId } = req.body;
    const slot = await ParkingSlot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.isOccupied) return res.status(400).json({ message: 'Slot already occupied' });

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const ticket = await Ticket.create({
      slot: slot._id,
      vehicle: vehicle._id,
      entryTime: new Date(),
      status: 'open'
    });

    slot.isOccupied = true;
    await slot.save();

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.list = async (_req, res) => {
  const tickets = await Ticket.find()
    .populate('slot vehicle')
    .sort({ createdAt: -1 });
  res.json(tickets);
};

exports.get = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('slot vehicle');
  if (!ticket) return res.status(404).json({ message: 'Not found' });
  res.json(ticket);
};

// --- add near the top (after requires) ---
const ceilHoursBetween = (start, end) => {
  const ms = Math.max(0, new Date(end) - new Date(start));
  const hours = ms / (1000 * 60 * 60);
  return Math.ceil(hours || 0.01); // bill minimum 1 hour if < 1hr (optional)
};

// --- add this new handler ---
exports.checkout = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('slot');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (ticket.status === 'closed') return res.status(400).json({ message: 'Ticket already closed' });

    ticket.exitTime = new Date();
    const rate = ticket.slot?.hourlyRate ?? 50;
    const hours = ceilHoursBetween(ticket.entryTime, ticket.exitTime);
    ticket.amount = hours * rate;
    ticket.status = 'closed';
    await ticket.save();

    // free the slot
    const slot = await ParkingSlot.findById(ticket.slot._id);
    if (slot) { slot.isOccupied = false; await slot.save(); }

    res.json({
      _id: ticket._id,
      status: ticket.status,
      entryTime: ticket.entryTime,
      exitTime: ticket.exitTime,
      amount: ticket.amount,
      hours,
      rate
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.pay = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (ticket.status !== 'closed') return res.status(400).json({ message: 'Checkout first' });
    if (ticket.paid) return res.status(400).json({ message: 'Already paid' });

    const { method = 'upi', txnRef = '' } = req.body || {};
    const payment = await Payment.create({
      ticket: ticket._id,
      amount: ticket.amount || 0,
      method,
      status: 'success',
      txnRef
    });

    ticket.paid = true;
    await ticket.save();

    res.status(201).json({ ticket, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
