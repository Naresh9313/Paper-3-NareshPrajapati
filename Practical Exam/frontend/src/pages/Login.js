// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }
//       localStorage.setItem("token", data.token);
//       alert("Login successful");
//       navigate("/");
//     } catch (error) {
//       console.log("error", error.message);
//     }
//   };

//   return (
//       <>
//     <div style={{border:"10px solid black",padding:10,margin:10,background:"pink"}}>
//     <center>
//       <h1>Login</h1>
//       Email:
//       <input type="text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
//       <br /><br/>
//       Password:
//       <input type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
//       <br /><br/>
//       <button onClick={handleLogin}>Submit</button><br /><br/>
//             Already Register can <a href="/register">Register</a></center>
      
// </div>
//     </>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div
      style={{
        border: "10px solid black",
        padding: 10,
        margin: 10,
        background: "pink",
      }}
    >
      <center>
        <h1>Login</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Email */}
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Enter Your Email"
                style={{ padding: "5px" }}
              />
              <br />
              <ErrorMessage
                name="email"
                component="span"
                style={{ color: "red", fontSize: "14px" }}
              />
              <br />
              <br />
            </div>

            {/* Password */}
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Enter Your Password"
                style={{ padding: "5px" }}
              />
              <br />
              <ErrorMessage
                name="password"
                component="span"
                style={{ color: "red", fontSize: "14px" }}
              />
              <br />
              <br />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>

        <br />
        Don't have an account? <a href="/register">Register</a>
      </center>
    </div>
  );
}

export default Login;
