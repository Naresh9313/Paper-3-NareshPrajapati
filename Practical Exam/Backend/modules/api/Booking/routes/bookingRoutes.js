import express from 'express';
import {
  attendeeDashboard,
  bookingEvent,
  cancelBooking,
  checkInAttendee,
  eventAttendees,
} from '../controller/bookingController.js';

const bookingRoutes = express.Router();

bookingRoutes.get('/eventBooking', bookingEvent);
bookingRoutes.put('/cancel', cancelBooking);
bookingRoutes.get("/dashboard", attendeeDashboard);
bookingRoutes.post("/check-in", checkInAttendee);
bookingRoutes.get("/event-attendees", eventAttendees);
export default bookingRoutes;
