-- ============================================================
-- Electricity Bill Management System - Database Schema
-- MySQL 8.x
-- ============================================================

CREATE DATABASE IF NOT EXISTS electricity_bill_db;
USE electricity_bill_db;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    name VARCHAR(100),
    role ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15) NOT NULL UNIQUE,
    meter_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100),
    status ENUM('ACTIVE', 'PENDING', 'OVERDUE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meters table
CREATE TABLE IF NOT EXISTS meters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    meter_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    meter_type ENUM('DIGITAL', 'ANALOG', 'SMART') NOT NULL DEFAULT 'DIGITAL',
    installation_date DATE,
    status ENUM('ACTIVE', 'FAULTY', 'REPLACED', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    last_reading DOUBLE DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Bills table
CREATE TABLE IF NOT EXISTS bills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bill_number VARCHAR(50) UNIQUE,
    customer_id BIGINT NOT NULL,
    meter_id BIGINT,
    previous_reading DOUBLE NOT NULL,
    current_reading DOUBLE NOT NULL,
    units_consumed DOUBLE,
    rate_per_unit DOUBLE,
    base_amount DOUBLE,
    fixed_charge DOUBLE DEFAULT 50.0,
    tax_amount DOUBLE,
    total_amount DOUBLE NOT NULL,
    billing_month VARCHAR(20),
    bill_date DATE,
    due_date DATE,
    status ENUM('PENDING', 'PAID', 'OVERDUE', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (meter_id) REFERENCES meters(id) ON DELETE SET NULL
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    receipt_number VARCHAR(50) UNIQUE,
    bill_id BIGINT NOT NULL,
    customer_id BIGINT,
    amount_paid DOUBLE NOT NULL,
    payment_mode ENUM('UPI', 'DEBIT_CARD', 'CREDIT_CARD', 'NET_BANKING', 'CASH') NOT NULL,
    status ENUM('SUCCESS', 'FAILED', 'PENDING', 'REFUNDED') NOT NULL DEFAULT 'SUCCESS',
    transaction_id VARCHAR(100),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Admin user (password: admin123)
INSERT INTO users (username, password, email, name, role) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lE3i', 'admin@ebms.com', 'Admin User', 'ADMIN'),
('user', '$2a$10$8K1p/a0dR6xxSKMFtXCwH.aqlzZY5Wz4jxYs8H6YqnZVBEJqZwFO2', 'user@ebms.com', 'Customer User', 'CUSTOMER');

-- Sample customers
INSERT INTO customers (name, address, phone, meter_number, email, status) VALUES
('Varsha', 'Hyderabad, Telangana', '9876543210', '45892', 'varsha@email.com', 'ACTIVE'),
('Ravi Kumar', 'Secunderabad, Telangana', '9123456780', '45893', 'ravi@email.com', 'ACTIVE'),
('Sunita Reddy', 'Warangal, Telangana', '9988776655', '45894', 'sunita@email.com', 'PENDING'),
('Anil Sharma', 'Karimnagar, Telangana', '9871234560', '45895', 'anil@email.com', 'OVERDUE'),
('Priya Patel', 'Nizamabad, Telangana', '9000112233', '45896', 'priya@email.com', 'ACTIVE');

-- Sample meters
INSERT INTO meters (meter_number, customer_id, meter_type, installation_date, status, last_reading) VALUES
('45892', 1, 'DIGITAL', '2025-02-12', 'ACTIVE', 1750),
('45893', 2, 'SMART',   '2025-01-05', 'ACTIVE', 2100),
('45894', 3, 'DIGITAL', '2025-03-20', 'FAULTY', 980),
('45895', 4, 'ANALOG',  '2024-11-15', 'REPLACED', 3200),
('45896', 5, 'SMART',   '2025-04-01', 'ACTIVE', 450);

-- Sample bills
INSERT INTO bills (bill_number, customer_id, meter_id, previous_reading, current_reading, units_consumed, rate_per_unit, base_amount, fixed_charge, tax_amount, total_amount, billing_month, bill_date, due_date, status) VALUES
('BILL-20260301', 1, 1, 1500, 1750, 250, 6.0, 1500.0, 50.0, 75.0, 1625.0, '2026-03', '2026-03-01', '2026-03-31', 'PAID'),
('BILL-20260401', 1, 1, 1750, 2010, 260, 6.0, 1560.0, 50.0, 78.0, 1688.0, '2026-04', '2026-04-01', '2026-04-30', 'PENDING'),
('BILL-20260301-2', 2, 2, 1800, 2100, 300, 6.0, 1800.0, 50.0, 90.0, 1940.0, '2026-03', '2026-03-01', '2026-03-31', 'PAID'),
('BILL-20260401-3', 3, 3, 730, 980,  250, 6.0, 1500.0, 50.0, 75.0, 1625.0, '2026-04', '2026-04-01', '2026-04-30', 'PENDING'),
('BILL-20251101', 4, 4, 2950, 3200, 250, 6.0, 1500.0, 50.0, 75.0, 1625.0, '2025-11', '2025-11-01', '2025-11-30', 'OVERDUE');

-- Sample payments
INSERT INTO payments (receipt_number, bill_id, customer_id, amount_paid, payment_mode, status, transaction_id, payment_date) VALUES
('RCP-20260301001', 1, 1, 1625.0, 'UPI',         'SUCCESS', 'TXN1234567890', '2026-03-15 10:30:00'),
('RCP-20260301002', 3, 2, 1940.0, 'NET_BANKING',  'SUCCESS', 'TXN0987654321', '2026-03-20 14:45:00');
