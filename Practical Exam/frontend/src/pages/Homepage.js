import { useEffect, useState } from "react";

function Homepage() {
  const [ename, setEname] = useState("");
  const [edate, setEdate] = useState("");
  const [category, setCategory] = useState("");
  const [event, setEvent] = useState([]);


  const handleGet = async () => {
    try {
      const token = localStorage.getItem("token");

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
    } 
    catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);


  const handlePost = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/event/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ename,
          edate,
          category,
        }),
      });

      const data = await res.json();
      console.log("date", data);

      alert("Post created");
      handleGet();
    } 
    catch (error) {
      console.log("error", error.message);
    }
  };

   const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
       await fetch(`http://localhost:3001/event/deleteEvent?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

     
      alert("delete")
      handleGet()

    } 
    catch (error) {
      console.log("error", error.message);
    }
  };

    const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
       await fetch(`http://localhost:3001/event/deleteEvent?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify({
          ename,
          edate,
          category,
        }),
      });

     
      alert("Update")
      handleGet()

    } 
    catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <>
    <center>
      <div style={{border:"10px solid black", margin:"10px",padding:"10px"}}>
      <h2>Add Event</h2>

      <label>Event Name:</label>
      <input type="text" placeholder="Enter your event name" onChange={(e) => setEname(e.target.value)} /> <br /> <br />

      <label>Event Date:</label>
      <input type="text" placeholder="Enter your event date" onChange={(e) => setEdate(e.target.value)} /> <br /> <br />

      <label>Event Category:</label>
      <input type="text" placeholder="Enter your event category" onChange={(e) => setCategory(e.target.value)} /> <br /> <br />

      <button onClick={handlePost}>Submit</button>
      </div>
    </center>
      <h1>Event Data</h1>

      {event.map((item) => (
        <div key={item._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{item.ename}</h3>
          <p>{item.edate}</p>
          <p>{item.category}</p>

          <button onClick={() => handleDelete(item._id) }>Delete</button>
          <button onClick={() => handleUpdate(item._id) }>Update</button>

        </div>
      ))}
    </>
  );
}

export default Homepage;
