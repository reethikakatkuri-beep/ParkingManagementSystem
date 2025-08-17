import React, { useEffect, useState, useRef } from 'react';
import axios from '../axiosConfig.jsx';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const timer = useRef(null);

  const load = async () => {
    const res = await axios.get('/metrics/overview');
    setData(res.data);
  };

  useEffect(() => {
    load();
    // auto-refresh every 10s
    timer.current = setInterval(load, 10000);
    return () => clearInterval(timer.current);
  }, []);

  if (!data) return <div className="p-4">Loading…</div>;

  const { slots, tickets, payments, timestamp } = data;

  const Card = ({ title, value, sub }) => (
    <div className="rounded-2xl shadow p-5 border bg-white min-w-[220px]">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );

  return (
    <div className="p-5 space-y-6">
      <h1 className="text-2xl font-bold">Parking Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <Card title="Slots — Total" value={slots.total} sub={`Updated ${new Date(timestamp).toLocaleTimeString()}`} />
        <Card title="Slots — Occupied" value={slots.occupied} />
        <Card title="Slots — Free" value={slots.free} />
        <Card title="Tickets — Open" value={tickets.open} />
        <Card title="Tickets — Closed" value={tickets.closed} />
        <Card title="Revenue Today" value={payments.revenueToday} sub={`${payments.paymentsToday} payments`} />
      </div>

      <div className="text-sm text-gray-500">
        Auto-refreshes every 10 seconds. Navigate to <a className="underline" href="/checkin">Check-in</a> to operate tickets.
      </div>
    </div>
  );
}
