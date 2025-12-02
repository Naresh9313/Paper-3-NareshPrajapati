import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      alert("register sucess");
      navigate("/login");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <>
    <div style={{border:"10px solid black",padding:10,margin:10,background:"pink"}}>
    <center>
      <h1>Register</h1>
      Name:
      <input type="text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}  />
      <br /><br/>
      Email:
      <input type="text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br/>
      Password:
      <input type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br/>
      <button onClick={handleRegister}>Submit</button><br /><br/>
       Already Register can <a href="/login">Login</a></center>
      
</div>
    </>
  );
}

export default Register;
