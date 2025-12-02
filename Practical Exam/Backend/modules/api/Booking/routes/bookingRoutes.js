import express from 'express';
import { bookingEvent } from '../controller/bookingController.js';

const bookingRoutes = express.Router();


bookingRoutes.post("/eventBooking",bookingEvent)

export default bookingRoutes;
