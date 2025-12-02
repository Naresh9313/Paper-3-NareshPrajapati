import bookingModel from "../../../../models/bookingModel.js";
import eventModel from "../../../../models/eventModel.js";
import userModel from "../../../../models/userModel.js";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import statusCode from "../../../../config/statusCode.js";

export const bookingEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.query;
    const tickets = req.body?.tickets || 1;

    if (!userId || !eventId) {
      return res.status(400).json({ message: "userId & eventId required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(statusCode.NOT_FOUND).json({ 
      message: "User not found" });

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(statusCode.NOT_FOUND).json({
       message: "Event not found" });

    const existing = await bookingModel.findOne({ userId, eventId });
    if (existing) {
      return res.status(statusCode.DUPLICATE_VALUE).json({
         message: "You already booked this event!" });
    }

    const remainingSeats = event.capacity - event.seatsSold;

    let finalStatus = "confirmed";

    if (remainingSeats < tickets) {
      finalStatus = "waitlisted";
    } else {
      await eventModel.findByIdAndUpdate(eventId, {
        $inc: { seatsSold: tickets }
      });
    }

    const qrData = `${userId}-${eventId}-${Date.now()}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    const booking = await bookingModel.create({
      userId,
      eventId,
      tickets,
      status: finalStatus,
      qrCode: qrCodeImage
    });

 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


    const emailHTML = `
      <h2>Hello ${user.name},</h2>
      <p>Your event booking was successful.</p>

      <h3>${event.ename}</h3>
      <p><b>Date:</b> ${event.edate}</p>
      <p><b>Venue:</b> ${event.evenues}</p>
      <p><b>Location:</b> ${event.elocation}</p>
      <p><b>Price:</b> ₹${event.eprice}</p>
      <p><b>Tickets Booked:</b> ${tickets}</p>
      <p><b>Status:</b> ${finalStatus}</p>

      <h4>Your QR Code:</h4>
      <img src="cid:qrcodeimg" width="200"/>

      <p>Show this QR code at event entry.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Event Booking Confirmation",
      html: emailHTML,
      attachments: [
        {
          filename: "qrcode.png",
          cid: "qrcodeimg",
          path: qrCodeImage
        }
      ]
    });

    return res.status(statusCode.SUCCESS).json({
      message: "Booking Successful! Email Sent.",
      booking,
      status: finalStatus
    });

  } catch (error) {
    console.log("Booking error:", error);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


