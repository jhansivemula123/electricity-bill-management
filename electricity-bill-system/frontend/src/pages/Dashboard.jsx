import React, { useState, useEffect } from 'react';

const mockStats = { customers: 1248, bills: 986, revenue: '₹4.2L', pending: 142 };
const mockCustomers = [
  { id: 1023, name: 'Varsha', meter: '45892', phone: '9876543210', status: 'Active', bill: '₹1,500' },
  { id: 1024, name: 'Ravi Kumar', meter: '45893', phone: '9123456780', status: 'Active', bill: '₹1,380' },
  { id: 1025, name: 'Sunita Reddy', meter: '45894', phone: '9988776655', status: 'Pending', bill: '₹2,100' },
  { id: 1026, name: 'Anil Sharma', meter: '45895', phone: '9871234560', status: 'Overdue', bill: '₹980' },
];
const monthlyData = [
  { month: 'Nov', amount: 280000 },
  { month: 'Dec', amount: 320000 },
  { month: 'Jan', amount: 300000 },
  { month: 'Feb', amount: 380000 },
  { month: 'Mar', amount: 350000 },
  { month: 'Apr', amount: 420000 },
];
const activities = [
  { color: '#1D9E75', text: 'Bill generated for Varsha (ID: 1023)', time: 'Today, 10:42 AM' },
  { color: '#378ADD', text: 'Payment received ₹1,380 — Ravi Kumar', time: 'Today, 9:15 AM' },
  { color: '#BA7517', text: 'New customer added — Sunita Reddy', time: 'Yesterday, 4:30 PM' },
  { color: '#E24B4A', text: 'Overdue alert — Meter #44021', time: 'Yesterday, 2:00 PM' },
];

const statusBadge = (s) => {
  const map = { Active: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' };
  return <span className={`badge ${map[s] || 'badge-info'}`}>{s}</span>;
};

const maxAmt = Math.max(...monthlyData.map(d => d.amount));

export default function Dashboard() {
  const [stats] = useState(mockStats);

  return (
    <div className="page-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Customers</div>
          <div className="stat-value">{stats.customers.toLocaleString()}</div>
          <div className="stat-meta">+12 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Bills Generated</div>
          <div className="stat-value">{stats.bills}</div>
          <div className="stat-meta">April 2026</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue Collected</div>
          <div className="stat-value">{stats.revenue}</div>
          <div className="stat-meta">This month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Bills</div>
          <div className="stat-value" style={{ color: '#BA7517' }}>{stats.pending}</div>
          <div className="stat-meta" style={{ color: '#E24B4A' }}>Overdue: 38</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Monthly Revenue (₹ Lakhs)</div>
          <div className="bar-chart-wrap">
            {monthlyData.map((d, i) => (
              <div className="bar-col" key={d.month}>
                <div className="bar-col-val">₹{(d.amount / 100000).toFixed(1)}L</div>
                <div
                  className="bar-fill"
                  style={{
                    height: `${Math.round((d.amount / maxAmt) * 80)}px`,
                    opacity: i === monthlyData.length - 1 ? 1 : 0.65
                  }}
                />
                <div className="bar-col-label" style={{ color: i === monthlyData.length - 1 ? '#0F6E56' : undefined, fontWeight: i === monthlyData.length - 1 ? 600 : 400 }}>
                  {d.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Recent Activity</div>
          {activities.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-dot" style={{ background: a.color }} />
              <div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Recent Customers</div>
        <table>
          <thead>
            <tr>
              <th>Cust. ID</th><th>Name</th><th>Meter No.</th><th>Phone</th><th>Status</th><th>Bill Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.meter}</td>
                <td>{c.phone}</td>
                <td>{statusBadge(c.status)}</td>
                <td style={{ fontWeight: 600 }}>{c.bill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
