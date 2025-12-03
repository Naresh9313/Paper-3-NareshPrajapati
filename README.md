# 🎫 Event Booking System (MERN)

A full-stack MERN application for managing events, user registrations, bookings, QR code generation, and email confirmations.

## 🚀 Project Setup Guide

### 1️⃣ Clone the Repository
```bash
git clone "https://github.com/Naresh9313/Paper-3-NareshPrajapati.git"
```

### 2️⃣ Install Dependencies
#### Backend
```bash
cd Backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3️⃣ Run the Project
#### Backend
```bash
nodemon index.js
```
Backend: http://localhost:3001

#### Frontend
```bash
npm start
```
Frontend: http://localhost:3000

## 🔧 Environment Variables (.env)
Inside Backend/.env:
```
MONGO_CONN=your_mongodb_connection_string
PORT=3001
JWT_TOKEN=your_jwt_secret_key
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password
```

## 🔌 Backend API Details

### Auth APIs
Base: http://localhost:3001/auth
- POST /register
- POST /login

### Event APIs
Base: http://localhost:3001/event
- POST /addEvent
- GET /getEvent
- PUT /updateEvent
- DELETE /deleteEvent

### Booking API
Base: http://localhost:3001/booking
- POST /eventBooking?userId=xxx&eventId=xxx

## 🎨 Frontend Features
- Formik + Yup validation
- Fetch API Integration
- Search, Filter, sort, Pagination
- Event Booking

## 🛠 Technologies Used
Backend: Node.js, Express, MongoDB, JWT, multer, nodemailer, qrcode, joi  
Frontend: React, Formik, Yup, Bootstrap


