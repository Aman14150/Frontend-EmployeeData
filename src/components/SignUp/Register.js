import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <Container className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formFirstName" className="form-row">
            <Form.Label className="form-label">First Name:</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter first name"
              value={firstName}
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
            Already have an account? <a href="/login" className="signin-link">Sign In</a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
