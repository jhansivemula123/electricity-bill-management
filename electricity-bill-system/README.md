# ⚡ Electricity Bill Management System

A full-stack web application for managing electricity consumers, meter readings, bill generation, and payments.

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, React Router DOM  |
| Backend    | Spring Boot 3.2, Java 17          |
| Database   | MySQL 8.x                         |
| Security   | Spring Security + JWT             |
| Build Tool | Maven                             |

---

## 📁 Project Structure

```
electricity-bill-system/
├── frontend/          ← React + Vite app
├── backend/           ← Spring Boot API
└── database/          ← MySQL schema + seed data
```

---

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- Open MySQL and run:
source database/electricity_bill.sql
```

Or import using MySQL Workbench / DBeaver.

---

### 2. Backend Setup

**Prerequisites:** Java 17+, Maven 3.8+

```bash
cd backend

# Update database credentials in:
# src/main/resources/application.properties
# Change: spring.datasource.password=your_password_here

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

---

### 3. Frontend Setup

**Prerequisites:** Node.js 18+, npm

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend starts at: **http://localhost:3000**

---

## 🔐 Default Login Credentials

| Role     | Username | Password  |
|----------|----------|-----------|
| Admin    | admin    | admin123  |
| Customer | user     | user123   |

---

## 📋 Modules

| Module              | Description                              |
|---------------------|------------------------------------------|
| Login               | JWT-based admin/customer authentication  |
| Dashboard           | Stats, revenue chart, activity feed      |
| Customer Management | Add, edit, delete, search customers      |
| Meter Details       | Manage meter types and status            |
| Generate Bill       | Auto-calculate bill from meter readings  |
| Payment             | Multi-mode payment with receipt          |
| Bill History        | Filter, view, export bill records        |

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint            | Description    |
|--------|---------------------|----------------|
| POST   | /api/auth/login     | Login          |
| POST   | /api/auth/register  | Register user  |

### Customers
| Method | Endpoint               | Description      |
|--------|------------------------|------------------|
| GET    | /api/customers         | Get all          |
| GET    | /api/customers/{id}    | Get by ID        |
| POST   | /api/customers         | Create           |
| PUT    | /api/customers/{id}    | Update           |
| DELETE | /api/customers/{id}    | Delete           |

### Meters
| Method | Endpoint              | Description    |
|--------|-----------------------|----------------|
| GET    | /api/meters           | Get all        |
| POST   | /api/meters           | Create         |
| PUT    | /api/meters/{id}      | Update         |

### Bills
| Method | Endpoint                       | Description       |
|--------|--------------------------------|-------------------|
| GET    | /api/bills                     | Get all bills     |
| GET    | /api/bills/customer/{id}       | Bills by customer |
| POST   | /api/bills/generate            | Generate bill     |
| PUT    | /api/bills/{id}/pay            | Mark as paid      |

### Payments
| Method | Endpoint                      | Description      |
|--------|-------------------------------|------------------|
| GET    | /api/payments                 | Get all          |
| GET    | /api/payments/customer/{id}   | By customer      |
| POST   | /api/payments                 | Make payment     |

---

## 🛠️ Build for Production

### Frontend
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

### Backend
```bash
cd backend
mvn clean package -DskipTests
# Output: backend/target/electricity-bill-backend-1.0.0.jar
java -jar target/electricity-bill-backend-1.0.0.jar
```

---

## 📊 Database Tables

- `users` — Admin and customer login accounts
- `customers` — Consumer records
- `meters` — Meter allocation and readings
- `bills` — Generated electricity bills
- `payments` — Payment transactions and receipts

---

## 📝 License

This project is for educational purposes. Free to use and modify.
