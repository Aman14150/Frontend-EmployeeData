import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../AxiosServer/AxiosAuth'; // Adjust the path if necessary
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    
    try {
      await registerUser(name, email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <Container className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formName" className="form-row">
            <Form.Label className="form-label">Name:</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onClick={() => navigate("/")}
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
