1️⃣ Clone the Repository
git clone "https://github.com/Naresh9313/Paper-3-NareshPrajapati.git"

2️⃣ Install Dependencies
Backend
cd Backend
npm install

Frontend
cd ../frontend
npm install

3️⃣ Run the Project
Start Backend Server

From the Backend folder:
nodemon index.js


Backend will run on: http://localhost:3001
Frontend will run on: http://localhost:3000


4️⃣ Environment Variables (.env)

Create a .env file inside the Backend directory and add the following:

MONGO_CONN=your_mongodb_connection_string
PORT=3001

JWT_TOKEN=your_jwt_secret_key

EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_app_password



5️⃣ Backend API Endpoints
🔑 Auth APIs

Base URL: http://localhost:3001/auth
Register User
POST /register
Example:
http://localhost:3001/auth/register

Login User
POST /login
Example:
http://localhost:3001/auth/login

On successful login, a JWT token is generated and used for authentication in protected routes (Authorization: Bearer <token>).

🎫 Event APIs
Base URL: http://localhost:3001/event
Add Event
POST /addEvent
Example:
http://localhost:3001/event/addEvent

Get Events (with Search, Filter, Pagination)
GET /getEvent
Query :

search – search by event name, etc.
filter – filter by category, status, etc.
page – page number
limit – items per page

Example:
http://localhost:3001/event/getEvent?search=music&page=1&limit=10

Update Event
PUT /updateEvent/:eventId
Example:
http://localhost:3001/event/updateEvent/692e9903733205355230e11a

Delete Event
DELETE /deleteEvent/:eventId
Example:
http://localhost:3001/event/deleteEvent/692e9903733205355230e11a

📩 Booking APIs
Base URL: http://localhost:3001/booking

Book Event
POST /eventBooking
Query :
userId
eventId

Example:
http://localhost:3001/booking/eventBooking?userId=692eb2c45f06f835cf54ffca&eventId=692e9903733205355230e11a

6️⃣ Frontend Functionality

Built using React.
Form handling & validation with Formik and Yup.
API integration using fetch (or similar) to connect with the backend.
Features:
User registration & login.
Event listing with search, filters, and pagination.
Event booking flow.

7️⃣ Technologies & Libraries Used

Backend:
Node.js
Express.js
MongoDB & Mongoose

nodemailer – for sending emails (e.g., booking confirmation)
qrcode – for generating QR codes (e-ticket / booking)
multer – for file uploads (e.g., event images)
joi – for request data validation
JWT – for authentication

Frontend:
React
Formik + Yup (form validation)
Bootstrap 
