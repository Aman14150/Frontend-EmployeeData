import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    // On successful login, navigate to the desired page
    // Example: navigate("/dashboard");
  };

  return (
    <Container className="login-container">
      <h1>Employee Data App</h1>
      <div className="login-box">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="email-row">
            <Form.Label className="emailHead">Email address:</Form.Label>
            <Form.Control
              className="email-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="pass-row">
            <Form.Label className="emailHead">Password:</Form.Label>
            <Form.Control
              className="pass-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-btn">
            Login
          </Button>
        </Form>

        <div className="forgot-password-row">
          <div className="forgot-pass">Forgot Password?</div>
        </div>

        <div className="signup-row">
          Don't have an account? 
          <Button 
            variant="link" 
            className="signup-link" 
            onClick={() => navigate("/register")} // Use navigate for routing
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
