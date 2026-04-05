import React, { useState } from 'react';

const initialCustomers = [
  { id: 1023, name: 'Varsha', address: 'Hyderabad', phone: '9876543210', meter: '45892', status: 'Active' },
  { id: 1024, name: 'Ravi Kumar', address: 'Secunderabad', phone: '9123456780', meter: '45893', status: 'Active' },
  { id: 1025, name: 'Sunita Reddy', address: 'Warangal', phone: '9988776655', meter: '45894', status: 'Pending' },
  { id: 1026, name: 'Anil Sharma', address: 'Karimnagar', phone: '9871234560', meter: '45895', status: 'Overdue' },
];

const emptyForm = { id: '', name: '', address: '', phone: '', meter: '', status: 'Active' };

const statusBadge = (s) => {
  const map = { Active: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s] || 'badge-info'}`}>{s}</span>;
};

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.meter) return showAlert('Fill all required fields', 'danger');
    if (editing) {
      setCustomers(customers.map(c => c.id === form.id ? { ...form, id: Number(form.id) } : c));
      showAlert('Customer updated successfully');
    } else {
      const newId = Math.max(...customers.map(c => c.id)) + 1;
      setCustomers([...customers, { ...form, id: newId }]);
      showAlert('Customer added successfully');
    }
    setForm(emptyForm);
    setEditing(false);
  };

  const handleEdit = (c) => { setForm({ ...c }); setEditing(true); };
  const handleDelete = (id) => { setCustomers(customers.filter(c => c.id !== id)); showAlert('Customer deleted'); };
  const handleReset = () => { setForm(emptyForm); setEditing(false); };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    String(c.id).includes(search) ||
    c.meter.includes(search)
  );

  return (
    <div className="page-content">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">{editing ? 'Edit Customer' : 'Add New Customer'}</div>
          <div className="form-group">
            <label className="form-label">Customer ID {editing && <span className="badge badge-info" style={{ marginLeft: 6 }}>Editing</span>}</label>
            <input className="form-control" value={form.id} readOnly={editing} placeholder="Auto-generated"
              onChange={e => setForm({ ...form, id: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Customer Name *</label>
            <input className="form-control" placeholder="Full name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-control" placeholder="City / Area" value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input className="form-control" placeholder="10-digit mobile" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Meter Number *</label>
            <input className="form-control" placeholder="Meter ID" value={form.meter}
              onChange={e => setForm({ ...form, meter: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option><option>Pending</option><option>Overdue</option>
            </select>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? '✔ Update' : '+ Save'}
            </button>
            <button className="btn btn-outline" onClick={handleReset}>Reset</button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Customer Records
            <input className="form-control" style={{ width: 180, fontSize: 12 }} placeholder="Search..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Meter</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.meter}</td>
                  <td>{statusBadge(c.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => handleEdit(c)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
