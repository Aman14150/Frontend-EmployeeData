import React, { useState } from "react";
import "./App.css";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  // Function to toggle the form's visibility
  const toggleForm = () => setShowForm((prevShowForm) => !prevShowForm);

  // Reset form fields
  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError(null);
  };

  // Add a new employee to the list
  const addEmployee = () => {
    if (!name || !email || !phone) {
      setError("All fields are required"); // Set error if any field is empty
      return;
    }

    const newEmployee = { name, email, phone };
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]); // Add new employee to the list
    reset(); // Clear form fields after submission
    setShowForm(false); // Hide form after submission
  };

  // Placeholder functions for handling edit and delete actions
  const handleEdit = (index) => {
    // Implement edit functionality
  };

  const handleDelete = (index) => {
    // Implement delete functionality
  };

  return (
    <Container className="container">
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      {/* Display error message if any */}
      <header className="App-header">
        <h2>Manage Employees</h2>
        <div className="headBtns">
          <Button variant="danger" className="deleteBtn">
            Delete
          </Button>
          <Button variant="success" className="addBtn" onClick={toggleForm}>
            👨‍💼 {showForm ? "Hide Form" : "Add New Employee"}
          </Button>
        </div>
      </header>
      {showForm && (
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addEmployee}>
            Submit
          </Button>{" "}
          <Button variant="secondary" onClick={reset}>
            Clear
          </Button>
        </Form>
      )}
      {employees.length > 0 && (
        <div className="employee-container">
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}{" "}
                  </td>
                  <td style={{border: "1px solid black", padding: "10px"}}>{employee.name}</td>
                  <td style={{border: "1px solid black", padding: "10px"}}>{employee.email}</td>
                  <td style={{border: "1px solid black", padding: "10px"}}>{employee.phone}</td>
                  <td className="tableBtns">
                    <Button variant="secondary" style={{marginRight: "10px"}} onClick={() => handleEdit(index)}>
                    <MdEditSquare style={{fontSize: "30px"}} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                    <MdDeleteForever style={{fontSize: "30px"}}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}

export default App;
