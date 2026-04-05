import React, { useState } from 'react';

const initialMeters = [
  { id: 1, meterNo: '45892', customerId: 1023, customerName: 'Varsha', type: 'Digital', installDate: '12-02-2025', status: 'Active' },
  { id: 2, meterNo: '45893', customerId: 1024, customerName: 'Ravi Kumar', type: 'Smart', installDate: '05-01-2025', status: 'Active' },
  { id: 3, meterNo: '45894', customerId: 1025, customerName: 'Sunita Reddy', type: 'Digital', installDate: '20-03-2025', status: 'Faulty' },
  { id: 4, meterNo: '45895', customerId: 1026, customerName: 'Anil Sharma', type: 'Analog', installDate: '15-11-2024', status: 'Replaced' },
];

const emptyForm = { meterNo: '', customerId: '', type: 'Digital', installDate: '', status: 'Active' };

const statusBadge = (s) => {
  const map = { Active: 'badge-success', Faulty: 'badge-danger', Replaced: 'badge-warning' };
  return <span className={`badge ${map[s] || 'badge-info'}`}>{s}</span>;
};

export default function MeterDetails() {
  const [meters, setMeters] = useState(initialMeters);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSave = () => {
    if (!form.meterNo || !form.customerId) return showAlert('Fill required fields', 'danger');
    if (editing !== null) {
      setMeters(meters.map(m => m.id === editing ? { ...m, ...form } : m));
      showAlert('Meter updated');
      setEditing(null);
    } else {
      setMeters([...meters, { ...form, id: meters.length + 1, customerName: 'Customer #' + form.customerId }]);
      showAlert('Meter saved');
    }
    setForm(emptyForm);
  };

  const handleEdit = (m) => {
    setForm({ meterNo: m.meterNo, customerId: m.customerId, type: m.type, installDate: m.installDate, status: m.status });
    setEditing(m.id);
  };

  return (
    <div className="page-content">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">{editing ? 'Edit Meter' : 'Add Meter Details'}</div>
          <div className="form-group">
            <label className="form-label">Meter Number *</label>
            <input className="form-control" placeholder="e.g. 45892" value={form.meterNo}
              onChange={e => setForm({ ...form, meterNo: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Customer ID *</label>
            <input className="form-control" placeholder="e.g. 1023" value={form.customerId}
              onChange={e => setForm({ ...form, customerId: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Meter Type</label>
            <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Digital</option><option>Analog</option><option>Smart</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Installation Date</label>
            <input className="form-control" type="date" value={form.installDate}
              onChange={e => setForm({ ...form, installDate: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Meter Status</label>
            <select className="form-control" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option><option>Faulty</option><option>Replaced</option>
            </select>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Save'}</button>
            <button className="btn btn-outline" onClick={() => { setForm(emptyForm); setEditing(null); }}>Reset</button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">All Meters</div>
          <table>
            <thead>
              <tr><th>Meter No.</th><th>Cust. ID</th><th>Type</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {meters.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.meterNo}</td>
                  <td>{m.customerId}</td>
                  <td>{m.type}</td>
                  <td>{statusBadge(m.status)}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => handleEdit(m)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
