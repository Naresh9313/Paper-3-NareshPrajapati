import Navbar from "../components/Navbar";

function Dashboard() {
  const user = localStorage.getItem("userId");
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">Dashboard</h2>

        <div className="row g-4">

     
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h4 className="fw-semibold">My Bookings</h4>
              <p>View your event bookings and cancel if needed.</p>
              <button className="btn btn-primary w-100">
                Go to Bookings
              </button>
            </div>
          </div>

       

        
        </div>
      </div>
    </>
  );
}

export default Dashboard;
