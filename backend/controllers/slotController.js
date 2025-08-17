const ParkingSlot = require('../models/ParkingSlot');

exports.create = async (req, res) => {
  try { const slot = await ParkingSlot.create(req.body); res.status(201).json(slot); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.list = async (req, res) => {
  const q = {};
  if (req.query.available === 'true') q.isOccupied = false;
  const slots = await ParkingSlot.find(q).sort({ code: 1 });
  res.json(slots);
};

exports.get = async (req, res) => {
  const s = await ParkingSlot.findById(req.params.id);
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
};

exports.update = async (req, res) => {
  try {
    const s = await ParkingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
  await ParkingSlot.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
