import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function Homepage() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleGet = async () => {
    try {
      const res = await fetch("http://localhost:3001/event/getEvent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEvents(data.event || []);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleBooking = async (eventId) => {
    if (!userId) {
      alert("Please login to book this event!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/booking/eventBooking?userId=${userId}&eventId=${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tickets: 1 }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking Successful! Check your Email.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Booking Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h1 className="text-center mb-4 fw-bold">Available Events</h1>

        <div className="row">
          {events.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <div className="card shadow-sm border-0 h-100">
                
                <div className="card-header bg-primary text-white text-center">
                  <h5 className="mb-0">{item.ename}</h5>
                </div>

                <div className="card-body">
                  <p><b>Date:</b> {item.edate}</p>
                  <p><b>Category:</b> {item.category}</p>
                  <p><b>Venue:</b> {item.evenues}</p>
                  <p><b>Location:</b> {item.elocation}</p>
                  <p><b>Price:</b> ₹{item.eprice}</p>
                </div>

                <div className="card-footer bg-light d-flex justify-content-center">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleBooking(item._id)}
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
