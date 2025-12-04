import express from 'express';
import {
  bookingEvent,
  cancelBooking,
} from '../controller/bookingController.js';

const bookingRoutes = express.Router();

bookingRoutes.get('/eventBooking', bookingEvent);
bookingRoutes.put('/cancel', cancelBooking);

export default bookingRoutes;
