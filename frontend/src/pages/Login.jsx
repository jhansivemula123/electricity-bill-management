import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Demo login - replace with actual API call: await login(form)
      if (form.username === 'admin' && form.password === 'admin123') {
        localStorage.setItem('token', 'demo-token-12345');
        localStorage.setItem('user', JSON.stringify({ name: 'Admin', role: 'Administrator' }));
        navigate('/dashboard');
      } else if (form.username === 'user' && form.password === 'user123') {
        localStorage.setItem('token', 'demo-token-user');
        localStorage.setItem('user', JSON.stringify({ name: 'Customer', role: 'Customer' }));
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Try admin/admin123');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-icon">⚡</div>
          <div className="login-title">Electricity Bill System</div>
          <div className="login-sub">Sign in to your account</div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="role-selector">
            {['admin', 'customer'].map(role => (
              <button
                type="button"
                key={role}
                className={`role-btn ${form.role === role ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role })}
              >
                {role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
              </button>
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 16, padding: 12, background: '#F8FAFC', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)' }}>
          <strong>Demo Credentials:</strong><br />
          Admin: admin / admin123<br />
          Customer: user / user123
        </div>
      </div>
    </div>
  );
}
