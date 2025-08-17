const ParkingSlot = require('../models/ParkingSlot');
const Ticket = require('../models/Ticket');
const Payment = require('../models/Payment');

exports.overview = async (_req, res) => {
  // today window (local server time)
  const start = new Date(); start.setHours(0,0,0,0);
  const end = new Date();   end.setHours(23,59,59,999);

  // parallel queries
  const [
    totalSlots, occupiedSlots, freeSlots,
    openTickets, closedTickets,
    revenueAgg
  ] = await Promise.all([
    ParkingSlot.countDocuments({}),
    ParkingSlot.countDocuments({ isOccupied: true }),
    ParkingSlot.countDocuments({ isOccupied: false }),
    Ticket.countDocuments({ status: 'open' }),
    Ticket.countDocuments({ status: 'closed' }),
    Payment.aggregate([
      { $match: { status: 'success', paidAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, revenue: { $sum: "$amount" }, count: { $sum: 1 } } }
    ])
  ]);

  const revenueToday = revenueAgg?.[0]?.revenue || 0;
  const paymentsToday = revenueAgg?.[0]?.count || 0;

  res.json({
    slots: { total: totalSlots, occupied: occupiedSlots, free: freeSlots },
    tickets: { open: openTickets, closed: closedTickets },
    payments: { revenueToday, paymentsToday },
    timestamp: new Date()
  });
};
