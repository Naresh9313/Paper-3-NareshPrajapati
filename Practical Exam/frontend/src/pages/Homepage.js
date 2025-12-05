import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Homepage() {
  const { user, token } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const handleGet = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/event/getEvent?search=${search}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setEvents(data.event || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, [search, page]);

  const handleBooking = async (eventId) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const res = await fetch(
      `http://localhost:3001/booking/eventBooking?userId=${user}&eventId=${eventId}&tickets=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    if (res.ok) alert("Booking success!");
    else alert(data.message);
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h1 className="text-center mb-4 fw-bold">Available Events</h1>

        <input
          className="form-control mb-3"
          placeholder="Search events..."
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <div className="row">
          {events.map((item) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card p-2 shadow">
                <h5>{item.ename}</h5>
                <p><b>Date:</b> {item.edate}</p>
                <p><b>Category:</b> {item.category}</p>
                <p><b>Venue:</b> {item.evenues}</p>
                <p><b>Location:</b> {item.elocation}</p>
                <p><b>Price:</b> ₹{item.eprice}</p>

                <button
                  className="btn btn-success w-100"
                  onClick={() => handleBooking(item._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-primary mx-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="fw-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-primary mx-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
