import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import MeterDetails from './pages/MeterDetails';
import GenerateBill from './pages/GenerateBill';
import Payment from './pages/Payment';
import BillHistory from './pages/BillHistory';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/customers': 'Customer Management',
  '/meters': 'Meter Details',
  '/generate-bill': 'Generate Bill',
  '/payment': 'Payment',
  '/bill-history': 'Bill History',
};

function ProtectedLayout({ children, title }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">
        <div className="topbar">
          <h2>{title}</h2>
          <div className="topbar-right">
            <span className="badge badge-success">System Online</span>
            <span className="text-muted" style={{ fontSize: 12 }}>
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {[
          ['/dashboard', <Dashboard />, 'Dashboard'],
          ['/customers', <Customers />, 'Customer Management'],
          ['/meters', <MeterDetails />, 'Meter Details'],
          ['/generate-bill', <GenerateBill />, 'Generate Bill'],
          ['/payment', <Payment />, 'Payment'],
          ['/bill-history', <BillHistory />, 'Bill History'],
        ].map(([path, el, title]) => (
          <Route key={path} path={path} element={<ProtectedLayout title={title}>{el}</ProtectedLayout>} />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
