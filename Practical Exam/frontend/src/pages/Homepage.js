import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function Homepage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleGet = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/event/getEvent?search=${search}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setEvents(data.event || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    handleGet();
  }, [search, page]);

  const handleBooking = async (eventId) => {
    if (!userId) {
      alert("Please login to book this event!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/booking/eventBooking?userId=${userId}&eventId=${eventId}&tickets=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h1 className="text-center mb-4 fw-bold">Available Events</h1>

        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search events by name..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          {events.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-primary text-white text-center">
                  <h5 className="mb-0">{item.ename}</h5>
                </div>

                <div className="card-body">
                  <p>
                    <b>Date:</b> {item.edate}
                  </p>
                  <p>
                    <b>Category:</b> {item.category}
                  </p>
                  <p>
                    <b>Venue:</b> {item.evenues}
                  </p>
                  <p>
                    <b>Location:</b> {item.elocation}
                  </p>
                  <p>
                    <b>Price:</b> ₹{item.eprice}
                  </p>
                </div>

                <div className="card-footer bg-light">
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

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary mx-2"
            disabled={page === 1}
            onClick={handlePrev}
          >
            Previous
          </button>

          <span className="mt-2">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-primary mx-2"
            disabled={page === totalPages}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;


// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "../components/Navbar";

// function Homepage() {
//   const [events, setEvents] = useState([]);
//   const [search, setSearch] = useState("");
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   const handleGet = async () => {
//     try {
//       const res = await fetch(`http://localhost:3001/event/getEvent?search=${search}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setEvents(data.event || []);
//     } catch (error) {
//       console.log("Error:", error.message);
//     }
//   };

//   useEffect(() => {
//     handleGet();
//   }, [search]);

//   const handleBooking = async (eventId) => {
//     if (!userId) {
//       alert("Please login to book this event!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3001/booking/eventBooking?userId=${userId}&eventId=${eventId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ tickets: 1 }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert("Booking Successful! Check your Email.");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log("Booking Error:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container py-4">
//         <h1 className="text-center mb-4 fw-bold">Available Events</h1>

//         <div className="row mb-4">
//           <div className="col-md-6 mx-auto">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search events by name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="row">
//           {events.map((item) => (
//             <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
//               <div className="card shadow-sm border-0 h-100">

//                 <div className="card-header bg-primary text-white text-center">
//                   <h5 className="mb-0">{item.ename}</h5>
//                 </div>

//                 <div className="card-body">
//                   <p><b>Date:</b> {item.edate}</p>
//                   <p><b>Category:</b> {item.category}</p>
//                   <p><b>Venue:</b> {item.evenues}</p>
//                   <p><b>Location:</b> {item.elocation}</p>
//                   <p><b>Price:</b> ₹{item.eprice}</p>
//                 </div>

//                 <div className="card-footer bg-light d-flex justify-content-center">
//                   <button
//                     className="btn btn-success w-100"
//                     onClick={() => handleBooking(item._id)}
//                   >
//                     Book Now
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Homepage;
