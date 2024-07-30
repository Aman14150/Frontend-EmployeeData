import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

const Register = () => {
  const [name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    // On successful registration, navigate to the login page
    // Example: navigate("/login");
  };

  return (
    <Container className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formFirstName" className="form-row">
            <Form.Label className="form-label">Name:</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-row">
            <Form.Label className="form-label">Email address:</Form.Label>
            <Form.Control
              className="form-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-row">
            <Form.Label className="form-label">Create Password:</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="register-btn">
            Register
          </Button>
        </Form>

        <div className="signin-row">
          <p className="signin-text">
            Already have an account? 
            <Button 
              variant="link" 
              className="signin-link" 
              onClick={() => navigate("/")} // Use navigate for routing
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
