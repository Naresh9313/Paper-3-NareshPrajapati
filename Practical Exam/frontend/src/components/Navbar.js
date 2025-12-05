// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");

//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//       <div className="container">

//         <Link className="navbar-brand fw-bold" to="/">
//         Naresh Prajapati
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto">

//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>
//           </ul>

//           {!token ? (
//             <>
//               <Link className="btn btn-light me-2" to="/login">
//                 Login
//               </Link>
//               <Link className="btn btn-outline-light" to="/register">
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
              
            
//               <button className="btn btn-danger" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Naresh Prajapati
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>

          {!user ? (
            <>
              <Link className="btn btn-light me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/register">Register</Link>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
