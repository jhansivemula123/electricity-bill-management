import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      padding: '14px 24px',
      borderTop: '1px solid var(--border)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      textAlign: 'center',
      background: 'white',
      marginTop: 'auto'
    }}>
      ⚡ Electricity Bill Management System &copy; {new Date().getFullYear()} — All Rights Reserved
    </footer>
  );
}
