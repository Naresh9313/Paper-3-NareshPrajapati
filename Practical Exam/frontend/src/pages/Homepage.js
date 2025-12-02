import { useEffect, useState } from "react";

function Homepage() {
  const [event, setEvent] = useState([]);
  const token = localStorage.getItem("token");

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
      console.log("GET DATA:", data);

      setEvent(data.event);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);



  return (
    <>
    
      <center>
        <h1>Event Data</h1>
      </center>

      {event.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >

          <h4><b>EventName:-</b>{item.ename}</h4>
          <p><b>EventDate:-</b>{item.edate}</p>
          <p><b>Category:-</b>{item.category}</p>
          <p><b>EventVenue:-</b>{item.evenues}</p>
          <p><b>EventPrice:-</b>₹{item.eprice}</p>
          <p><b>EventLocation:-</b>{item.elocation}</p>

          <button>Event Booking </button> 
          <button>Cancel Booking </button> 

        </div>
      ))}
    </>
  );
}

export default Homepage;
