import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Customers
export const getCustomers = () => api.get('/customers');
export const getCustomerById = (id) => api.get(`/customers/${id}`);
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Meters
export const getMeters = () => api.get('/meters');
export const getMeterById = (id) => api.get(`/meters/${id}`);
export const createMeter = (data) => api.post('/meters', data);
export const updateMeter = (id, data) => api.put(`/meters/${id}`, data);

// Bills
export const getBills = () => api.get('/bills');
export const getBillsByCustomer = (customerId) => api.get(`/bills/customer/${customerId}`);
export const generateBill = (data) => api.post('/bills/generate', data);

// Payments
export const getPayments = () => api.get('/payments');
export const makePayment = (data) => api.post('/payments', data);
export const getPaymentsByCustomer = (customerId) => api.get(`/payments/customer/${customerId}`);

export default api;
