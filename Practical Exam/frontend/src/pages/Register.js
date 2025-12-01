import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        alert("Registration failed");
        return;
      }

      alert("Register Success!");
      navigate("/login");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div style={{ border: "10px solid black", padding: 10, margin: 10, background: "pink" }}>
      <center>
        <h1>Register</h1>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>

            <div>
              <Field
                type="text"
                name="name"
                placeholder="Enter Your Name"
                style={{ padding: "5px" }}
              />
              <br />
              <ErrorMessage
                name="name"
                component="span"
                style={{ color: "red", fontSize: "14px" }}
              />
              <br /><br />
            </div>

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
              <br /><br />
            </div>

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
              <br /><br />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>

        <br />
        Already Registered? <a href="/login">Login</a>
      </center>
    </div>
  );
}

export default Register;
