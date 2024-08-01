import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../AxiosServer/AxiosAuth"; // Ensure this path is correct
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [inputError, setInputError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setInputError("Both email and password are required");
      return;
    }
  
    try {
      const response = await loginUser(email, password);
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      navigate("/appcontent", { state: { successMessage: 'Login successful!' } });

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        setError('An error occurred during login');
      } else {
        setError('Invalid email or password');
      }
      setSuccess(null);
    } 
  };

  return (
    <Container className="login-container">
      <h1>Employee Data App</h1>
      <div className="login-box">
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {inputError && <Alert variant="warning">{inputError}</Alert>}
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
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
