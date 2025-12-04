import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    tickets: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['confirmed', 'waitlisted', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Booking', bookingSchema);
