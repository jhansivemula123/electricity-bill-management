import React, { useState } from 'react';

const allBills = [
  { id: 'BILL-20260404', customerId: 1023, customer: 'Varsha', meter: '45892', month: 'Apr 2026', prev: 1750, curr: 2010, units: 260, amount: 1560, due: '30 Apr 2026', status: 'Pending' },
  { id: 'BILL-20260304', customerId: 1023, customer: 'Varsha', meter: '45892', month: 'Mar 2026', prev: 1500, curr: 1750, units: 250, amount: 1500, due: '31 Mar 2026', status: 'Paid' },
  { id: 'BILL-20260204', customerId: 1023, customer: 'Varsha', meter: '45892', month: 'Feb 2026', prev: 1270, curr: 1500, units: 230, amount: 1380, due: '28 Feb 2026', status: 'Paid' },
  { id: 'BILL-20260104', customerId: 1023, customer: 'Varsha', meter: '45892', month: 'Jan 2026', prev: 1060, curr: 1270, units: 210, amount: 1260, due: '31 Jan 2026', status: 'Paid' },
  { id: 'BILL-20251204', customerId: 1024, customer: 'Ravi Kumar', meter: '45893', month: 'Dec 2025', prev: 820, curr: 1060, units: 240, amount: 1440, due: '31 Dec 2025', status: 'Paid' },
  { id: 'BILL-20251104', customerId: 1025, customer: 'Sunita Reddy', meter: '45894', month: 'Nov 2025', prev: 610, curr: 820, units: 210, amount: 1260, due: '30 Nov 2025', status: 'Overdue' },
];

const statusBadge = (s) => {
  const map = { Paid: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s] || 'badge-info'}`}>{s}</span>;
};

export default function BillHistory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [customerFilter, setCustomerFilter] = useState('All');

  const customers = [...new Set(allBills.map(b => b.customer))];

  const filtered = allBills.filter(b => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search) || b.meter.includes(search);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchCustomer = customerFilter === 'All' || b.customer === customerFilter;
    return matchSearch && matchStatus && matchCustomer;
  });

  const totalPaid = filtered.filter(b => b.status === 'Paid').reduce((s, b) => s + b.amount, 0);
  const totalPending = filtered.filter(b => b.status !== 'Paid').reduce((s, b) => s + b.amount, 0);
  const avgBill = filtered.length > 0 ? Math.round(filtered.reduce((s, b) => s + b.amount, 0) / filtered.length) : 0;

  return (
    <div className="page-content">
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value" style={{ color: '#0F6E56' }}>₹{totalPaid.toLocaleString('en-IN')}</div>
          <div className="stat-meta">{filtered.filter(b => b.status === 'Paid').length} bills paid</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending / Overdue</div>
          <div className="stat-value" style={{ color: '#BA7517' }}>₹{totalPending.toLocaleString('en-IN')}</div>
          <div className="stat-meta">{filtered.filter(b => b.status !== 'Paid').length} bills due</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Bill</div>
          <div className="stat-value">₹{avgBill.toLocaleString('en-IN')}</div>
          <div className="stat-meta">Across {filtered.length} bills</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          Bill History
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="form-control" style={{ width: 160, fontSize: 12 }} placeholder="Search..." value={search}
              onChange={e => setSearch(e.target.value)} />
            <select className="form-control" style={{ width: 120, fontSize: 12 }} value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}>
              <option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option>
            </select>
            <select className="form-control" style={{ width: 140, fontSize: 12 }} value={customerFilter}
              onChange={e => setCustomerFilter(e.target.value)}>
              <option>All</option>
              {customers.map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="btn btn-outline btn-sm">⬇ Export CSV</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Bill ID</th><th>Customer</th><th>Month</th>
              <th>Units</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, fontSize: 12 }}>{b.id}</td>
                <td>{b.customer}</td>
                <td>{b.month}</td>
                <td>{b.units}</td>
                <td style={{ fontWeight: 600 }}>₹{b.amount.toLocaleString('en-IN')}</td>
                <td>{b.due}</td>
                <td>{statusBadge(b.status)}</td>
                <td>
                  {b.status === 'Paid'
                    ? <button className="btn btn-outline btn-sm">Receipt</button>
                    : <button className="btn btn-primary btn-sm">Pay Now</button>}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>No bills found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
