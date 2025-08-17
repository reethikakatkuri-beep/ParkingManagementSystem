const Vehicle = require('../models/Vehicle');

exports.create = async (req, res) => {
  try {
    const exists = await Vehicle.findOne({ plate: req.body.plate?.toUpperCase() });
    if (exists) return res.status(400).json({ message: 'Vehicle with this plate already exists' });
    const doc = await Vehicle.create(req.body);
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.list = async (_req, res) => {
  const docs = await Vehicle.find().sort({ createdAt: -1 });
  res.json(docs);
};

exports.get = async (req, res) => {
  const d = await Vehicle.findById(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.json(d);
};

exports.update = async (req, res) => {
  try {
    const d = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!d) return res.status(404).json({ message: 'Not found' });
    res.json(d);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
