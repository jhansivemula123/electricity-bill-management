import React, { useState } from 'react';

const paymentModes = [
  { id: 'upi', icon: '📱', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', icon: '💳', label: 'Debit / Credit Card', sub: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', icon: '🏦', label: 'Net Banking', sub: 'All major banks' },
  { id: 'cash', icon: '💵', label: 'Cash at Counter', sub: 'Pay at nearest office' },
];

const pendingBills = [
  { billId: 'BILL-001023', customerId: 1023, customerName: 'Varsha', meter: '45892', month: 'April 2026', units: 250, amount: 1560, due: '30 Apr 2026' },
  { billId: 'BILL-001025', customerId: 1025, customerName: 'Sunita Reddy', meter: '45894', month: 'April 2026', units: 350, amount: 2190, due: '30 Apr 2026' },
];

export default function Payment() {
  const [selectedBill, setSelectedBill] = useState(pendingBills[0]);
  const [mode, setMode] = useState('upi');
  const [receipt, setReceipt] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setReceipt({
        receiptId: 'RCP-' + Date.now().toString().slice(-8),
        ...selectedBill,
        mode: paymentModes.find(m => m.id === mode)?.label,
        paidOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        paidAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      });
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="page-content">
      {!receipt ? (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Make Payment</div>

            <div className="form-group">
              <label className="form-label">Select Pending Bill</label>
              <select className="form-control" onChange={e => setSelectedBill(pendingBills[parseInt(e.target.value)])}>
                {pendingBills.map((b, i) => (
                  <option key={b.billId} value={i}>{b.customerName} — {b.billId} — ₹{b.amount.toLocaleString('en-IN')}</option>
                ))}
              </select>
            </div>

            <div className="bill-summary" style={{ marginBottom: 16 }}>
              <div className="bill-row"><span>Bill ID</span><span style={{ fontWeight: 600 }}>{selectedBill.billId}</span></div>
              <div className="bill-row"><span>Customer</span><span>{selectedBill.customerName}</span></div>
              <div className="bill-row"><span>Meter No.</span><span>{selectedBill.meter}</span></div>
              <div className="bill-row"><span>Units Consumed</span><span>{selectedBill.units} units</span></div>
              <div className="bill-row"><span>Due Date</span><span style={{ color: '#E24B4A', fontWeight: 600 }}>{selectedBill.due}</span></div>
              <div className="bill-row total">
                <span>Amount to Pay</span>
                <span className="bill-amount">₹{selectedBill.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Payment Mode</label>
              {paymentModes.map(pm => (
                <div key={pm.id}
                  className={`payment-option ${mode === pm.id ? 'selected' : ''}`}
                  onClick={() => setMode(pm.id)}>
                  <span style={{ fontSize: 22 }}>{pm.icon}</span>
                  <div>
                    <div className="payment-option-label">{pm.label}</div>
                    <div className="payment-option-sub">{pm.sub}</div>
                  </div>
                  {mode === pm.id && <span style={{ marginLeft: 'auto', color: '#1D9E75', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>

            <button className="btn btn-primary w-full" onClick={handlePay} disabled={processing} style={{ marginTop: 8 }}>
              {processing ? '⏳ Processing Payment...' : `Pay Now ₹${selectedBill.amount.toLocaleString('en-IN')}`}
            </button>
          </div>

          <div className="card">
            <div className="card-title">Pending Bills</div>
            <table>
              <thead><tr><th>Bill ID</th><th>Customer</th><th>Amount</th><th>Due Date</th></tr></thead>
              <tbody>
                {pendingBills.map(b => (
                  <tr key={b.billId} style={{ cursor: 'pointer' }} onClick={() => setSelectedBill(b)}>
                    <td style={{ fontWeight: 600 }}>{b.billId}</td>
                    <td>{b.customerName}</td>
                    <td style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>₹{b.amount.toLocaleString('en-IN')}</td>
                    <td><span className="badge badge-danger">{b.due}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          <div className="card">
            <div className="receipt">
              <div className="receipt-header">
                <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Payment Successful!</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Receipt #{receipt.receiptId}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Amount Paid</div>
              <div className="receipt-amount">₹{receipt.amount.toLocaleString('en-IN')}</div>
              <div style={{ textAlign: 'left', marginTop: 16 }}>
                <div className="bill-row"><span>Customer</span><span>{receipt.customerName}</span></div>
                <div className="bill-row"><span>Bill ID</span><span>{receipt.billId}</span></div>
                <div className="bill-row"><span>Meter No.</span><span>{receipt.meter}</span></div>
                <div className="bill-row"><span>Units</span><span>{receipt.units} units</span></div>
                <div className="bill-row"><span>Payment Mode</span><span>{receipt.mode}</span></div>
                <div className="bill-row"><span>Paid On</span><span>{receipt.paidOn} at {receipt.paidAt}</span></div>
              </div>
              <div className="btn-row" style={{ marginTop: 20, justifyContent: 'center' }}>
                <button className="btn btn-primary btn-sm">⬇ Download Receipt</button>
                <button className="btn btn-outline btn-sm">📱 Send to Mobile</button>
                <button className="btn btn-outline btn-sm" onClick={() => setReceipt(null)}>New Payment</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Transaction Details</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <p>✅ Payment of <strong>₹{receipt.amount.toLocaleString('en-IN')}</strong> received via <strong>{receipt.mode}</strong>.</p>
              <p style={{ marginTop: 8 }}>The bill for <strong>{receipt.customerName}</strong> (Meter: {receipt.meter}) for the month of <strong>{receipt.month}</strong> has been marked as <strong style={{ color: '#1D9E75' }}>PAID</strong>.</p>
              <p style={{ marginTop: 8 }}>A confirmation SMS and email will be sent to the registered contact details within 24 hours.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
