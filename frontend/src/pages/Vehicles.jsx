import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.jsx';

export default function Vehicles() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ plate: '', ownerName: '', type: 'car', contact: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const { data } = await axios.get('/vehicles');
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/vehicles/${editing}`, form);
      setEditing(null);
    } else {
      await axios.post('/vehicles', form);
    }
    setForm({ plate: '', ownerName: '', type: 'car', contact: '' });
    load();
  };

  const del = async (id) => { await axios.delete('/vehicles/' + id); load(); };

  const startEdit = (v) => {
    setEditing(v._id);
    setForm({ plate: v.plate, ownerName: v.ownerName, type: v.type, contact: v.contact || '' });
  };

  const cancelEdit = () => { setEditing(null); setForm({ plate: '', ownerName: '', type: 'car', contact: '' }); };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Vehicles</h2>

      <form onSubmit={submit} className="flex gap-2 flex-wrap items-end">
        <input className="border p-2" placeholder="Plate (e.g., DL01AB1234)" value={form.plate}
               onChange={e => setForm({ ...form, plate: e.target.value })} required />
        <input className="border p-2" placeholder="Owner name" value={form.ownerName}
               onChange={e => setForm({ ...form, ownerName: e.target.value })} required />
        <select className="border p-2" value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>car</option><option>bike</option><option>van</option><option>truck</option>
        </select>
        <input className="border p-2" placeholder="Contact" value={form.contact}
               onChange={e => setForm({ ...form, contact: e.target.value })} />
        <button className="bg-black text-white px-3 py-2 rounded" type="submit">
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button type="button" onClick={cancelEdit} className="px-3 py-2 border rounded">Cancel</button>
        )}
      </form>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Plate</th>
            <th className="p-2 border">Owner</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(v => (
            <tr key={v._id}>
              <td className="p-2 border">{v.plate}</td>
              <td className="p-2 border">{v.ownerName}</td>
              <td className="p-2 border">{v.type}</td>
              <td className="p-2 border">{v.contact}</td>
              <td className="p-2 border space-x-3">
                <button className="underline" onClick={() => startEdit(v)}>Edit</button>
                <button className="text-red-600 underline" onClick={() => del(v._id)}>Delete</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
