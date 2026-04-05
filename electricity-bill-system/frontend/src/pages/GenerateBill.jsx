import React, { useState } from 'react';

const RATES = { domestic: 6, commercial: 9, industrial: 12 };

export default function GenerateBill() {
  const [form, setForm] = useState({
    customerId: '1023', customerName: 'Varsha', meterNo: '45892',
    prevReading: 1500, currReading: 1750, month: '2026-04',
    category: 'domestic', ratePerUnit: 6
  });
  const [bill, setBill] = useState(null);
  const [alert, setAlert] = useState(null);

  const units = Math.max(0, Number(form.currReading) - Number(form.prevReading));
  const baseAmount = units * form.ratePerUnit;
  const tax = Math.round(baseAmount * 0.05);
  const fixed = 50;
  const total = baseAmount + tax + fixed;

  const handleGenerate = () => {
    if (!form.customerId || !form.meterNo) return;
    if (Number(form.currReading) < Number(form.prevReading)) {
      setAlert({ msg: 'Current reading must be >= previous reading', type: 'danger' });
      return;
    }
    setBill({
      billId: 'BILL-' + Date.now().toString().slice(-6),
      ...form, units, baseAmount, tax, fixed, total,
      dueDate: '30 Apr 2026', generated: new Date().toLocaleDateString('en-IN')
    });
    setAlert({ msg: 'Bill generated successfully!', type: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="page-content">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Bill Generation Form</div>
          <div className="form-group">
            <label className="form-label">Customer ID</label>
            <input className="form-control" value={form.customerId}
              onChange={e => setForm({ ...form, customerId: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Customer Name</label>
            <input className="form-control" value={form.customerName}
              onChange={e => setForm({ ...form, customerName: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Meter Number</label>
            <input className="form-control" value={form.meterNo}
              onChange={e => setForm({ ...form, meterNo: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Billing Month</label>
            <input className="form-control" type="month" value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Previous Reading (units)</label>
            <input className="form-control" type="number" value={form.prevReading}
              onChange={e => setForm({ ...form, prevReading: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Current Reading (units)</label>
            <input className="form-control" type="number" value={form.currReading}
              onChange={e => setForm({ ...form, currReading: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value, ratePerUnit: RATES[e.target.value] })}>
              <option value="domestic">Domestic (₹6/unit)</option>
              <option value="commercial">Commercial (₹9/unit)</option>
              <option value="industrial">Industrial (₹12/unit)</option>
            </select>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 12, marginBottom: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Preview</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Units: {units} × ₹{form.ratePerUnit} = ₹{baseAmount.toLocaleString('en-IN')}</div>
          </div>
          <button className="btn btn-primary w-full" onClick={handleGenerate}>⚡ Generate Bill</button>
        </div>

        <div className="card">
          <div className="card-title">Bill Summary</div>
          {bill ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Bill ID</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{bill.billId}</div>
                </div>
                <span className="badge badge-warning">Pending Payment</span>
              </div>
              <div className="bill-summary">
                <div className="bill-row"><span>Customer</span><span>{bill.customerName} ({bill.customerId})</span></div>
                <div className="bill-row"><span>Meter Number</span><span>{bill.meterNo}</span></div>
                <div className="bill-row"><span>Billing Month</span><span>{bill.month}</span></div>
                <div className="bill-row"><span>Previous Reading</span><span>{bill.prevReading} units</span></div>
                <div className="bill-row"><span>Current Reading</span><span>{bill.currReading} units</span></div>
                <div className="bill-row"><span>Units Consumed</span><span style={{ fontWeight: 600 }}>{bill.units} units</span></div>
                <div className="bill-row"><span>Rate per Unit</span><span>₹{bill.ratePerUnit}</span></div>
                <div className="bill-row"><span>Base Amount</span><span>₹{bill.baseAmount.toLocaleString('en-IN')}</span></div>
                <div className="bill-row"><span>Fixed Charge</span><span>₹{bill.fixed}</span></div>
                <div className="bill-row"><span>Tax (5%)</span><span>₹{bill.tax}</span></div>
                <div className="bill-row total">
                  <span>Total Amount</span>
                  <span className="bill-amount">₹{bill.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                Due Date: <strong>{bill.dueDate}</strong> &nbsp;|&nbsp; Generated: <strong>{bill.generated}</strong>
              </div>
              <div className="btn-row">
                <button className="btn btn-primary btn-sm">⬇ Download PDF</button>
                <button className="btn btn-outline btn-sm">📱 Send SMS</button>
                <button className="btn btn-outline btn-sm">✉ Send Email</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
              <div>Fill the form and click <strong>Generate Bill</strong> to see the bill summary here.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
