import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.jsx';

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ code: '', level: 'G', type: 'car', hourlyRate: 50 });

  const load = async () => {
    const { data } = await axios.get('/slots');
    setSlots(data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await axios.post('/slots', form);
    setForm({ code: '', level: 'G', type: 'car', hourlyRate: 50 });
    load();
  };

  const del = async (id) => { await axios.delete('/slots/' + id); load(); };

  const toggleOcc = async (s) => {
    await axios.put('/slots/' + s._id, { isOccupied: !s.isOccupied });
    load();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Parking Slots</h2>

      <form onSubmit={create} className="flex gap-2 flex-wrap">
        <input className="border p-2" placeholder="Code" value={form.code}
               onChange={e => setForm({ ...form, code: e.target.value })} required />
        <input className="border p-2" placeholder="Level" value={form.level}
               onChange={e => setForm({ ...form, level: e.target.value })} />
        <select className="border p-2" value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>car</option><option>bike</option><option>handicap</option><option>electric</option>
        </select>
        <input className="border p-2" type="number" min={0} placeholder="Rate"
               value={form.hourlyRate}
               onChange={e => setForm({ ...form, hourlyRate: Number(e.target.value) })} />
        <button className="bg-black text-white px-3 py-2 rounded" type="submit">Add</button>
      </form>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Level</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Rate</th>
            <th className="p-2 border">Occupied</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map(s => (
            <tr key={s._id}>
              <td className="p-2 border">{s.code}</td>
              <td className="p-2 border">{s.level}</td>
              <td className="p-2 border">{s.type}</td>
              <td className="p-2 border">{s.hourlyRate}</td>
              <td className="p-2 border">
                <button className="underline" onClick={() => toggleOcc(s)}>
                  {s.isOccupied ? 'Yes' : 'No'}
                </button>
              </td>
              <td className="p-2 border">
                <button className="text-red-600 underline" onClick={() => del(s._id)}>Delete</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
