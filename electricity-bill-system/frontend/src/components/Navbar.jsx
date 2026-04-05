import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: '🏠', label: 'Dashboard', section: 'Main' },
  { path: '/customers', icon: '👥', label: 'Customers', section: 'Main' },
  { path: '/meters', icon: '🔌', label: 'Meter Details', section: 'Main' },
  { path: '/generate-bill', icon: '📄', label: 'Generate Bill', section: 'Billing' },
  { path: '/payment', icon: '💳', label: 'Payment', section: 'Billing' },
  { path: '/bill-history', icon: '📋', label: 'Bill History', section: 'Billing' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Admin","role":"Administrator"}');

  const sections = [...new Set(navItems.map(i => i.section))];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⚡</div>
        <div className="logo-title">Electricity Bill<br />Management</div>
        <div className="logo-sub">Admin Portal</div>
      </div>

      {sections.map(section => (
        <div className="nav-section" key={section}>
          <div className="nav-section-label">{section}</div>
          {navItems.filter(i => i.section === section).map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="nav-section">
        <div className="nav-section-label">Account</div>
        <div className="nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <span className="nav-icon">🚪</span>
          Logout
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-avatar">{user.name?.charAt(0) || 'A'}</div>
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
      </div>
    </div>
  );
}
