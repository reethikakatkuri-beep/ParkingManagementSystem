import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.jsx';

export default function Checkin() {
  const [slots, setSlots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [sel, setSel] = useState({ slotId: '', vehicleId: '' });

  const load = async () => {
    const s = await axios.get('/slots?available=true'); setSlots(s.data);
    const v = await axios.get('/vehicles'); setVehicles(v.data);
    const t = await axios.get('/tickets'); setTickets(t.data);
  };
  useEffect(() => { load(); }, []);

  const checkin = async (e) => {
    e.preventDefault();
    await axios.post('/tickets/checkin', sel);
    setSel({ slotId: '', vehicleId: '' });
    load();
  };

  const checkout = async (id) => {
    await axios.post(`/tickets/${id}/checkout`);
    load();
  };

  const pay = async (id) => {
    const method = window.prompt('Payment method? (upi/cash/card)', 'upi') || 'upi';
    const txnRef = window.prompt('Transaction reference (optional)', '') || '';
    await axios.post(`/tickets/${id}/pay`, { method, txnRef });
    load();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Vehicle Check-in / Checkout / Payments</h2>

      <form onSubmit={checkin} className="flex gap-2 flex-wrap">
        <select className="border p-2" value={sel.slotId}
                onChange={e => setSel({ ...sel, slotId: e.target.value })}>
          <option value="">Select Slot</option>
          {slots.map(s => <option key={s._id} value={s._id}>{s.code} ({s.level})</option>)}
        </select>
        <select className="border p-2" value={sel.vehicleId}
                onChange={e => setSel({ ...sel, vehicleId: e.target.value })}>
          <option value="">Select Vehicle</option>
          {vehicles.map(v => <option key={v._id} value={v._id}>{v.plate} - {v.ownerName}</option>)}
        </select>
        <button className="bg-black text-white px-3 py-2 rounded" type="submit">Check-in</button>
      </form>

      <h3 className="text-lg font-semibold">Tickets</h3>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Plate</th>
            <th className="p-2 border">Slot</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Entry</th>
            <th className="p-2 border">Exit</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Paid</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id}>
              <td className="p-2 border">{t.vehicle?.plate}</td>
              <td className="p-2 border">{t.slot?.code}</td>
              <td className="p-2 border">{t.status}</td>
              <td className="p-2 border">{new Date(t.entryTime).toLocaleString()}</td>
              <td className="p-2 border">{t.exitTime ? new Date(t.exitTime).toLocaleString() : '-'}</td>
              <td className="p-2 border">{t.amount ?? 0}</td>
              <td className="p-2 border">{t.paid ? 'Yes' : 'No'}</td>
              <td className="p-2 border space-x-3">
                {t.status === 'open' && (
                  <button className="underline" onClick={() => checkout(t._id)}>Checkout</button>
                )}
                {t.status === 'closed' && !t.paid && (
                  <button className="underline" onClick={() => pay(t._id)}>Pay</button>
                )}
                {t.status === 'closed' && t.paid && <span className="text-gray-500">Completed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
