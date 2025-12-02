import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <>
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
          Email:
          <input
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          Password:
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleLogin}>Submit</button>
          <br />
          <br />
          Already Register can <a href="/register">Register</a>
        </center>
      </div>
    </>
  );
}

export default Login;
