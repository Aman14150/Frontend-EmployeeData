import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { getEmployee, postEmployee, deleteAllEmployees, deleteEmployee } from "./AxiosServer.js";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const toggleForm = () => setShowForm((prevShowForm) => !prevShowForm);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await getEmployee();
      console.log("Fetched employees:", response.data);
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees", error);
      setEmployees([]);
    }
  };

  // Reset form fields and error state
  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError(null);
  };

  // Add a new employee to the list
  const addEmployee = async () => {
    if (!name || !email || !phone) {
      setError("All fields are required");
      return;
    }
    const newEmployee = { name, email, phone };

    // Clear previous errors before making the request
    setError(null);

    try {
      // Use Axios to post new employee data
      const response = await postEmployee(newEmployee);
      console.log("Employee added:", response.data.data);

      // Update the employee list with the newly added employee
      setEmployees((prevEmployees) => [...prevEmployees, response.data.data]);

      // Reset form fields and hide the form
      reset();
      setShowForm(false);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'DuplicateEmail') {
        setError("Email already exists. Please use a different email.");
      } else {
        console.error("Error adding employee", error);
        setError("Error adding employee");
      }
    }
  };

  // Function to delete all employees
  const deleteAll = async () => {
    try {
      await deleteAllEmployees();
      // Clear the employees state
      setEmployees([]);
    } catch (error) {
      console.error("Error deleting employees", error);
      setError("Error deleting employees");
    }
  };

  // Function to delete a specific employee
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
      setError("Error deleting employee");
    }
  };

  const handleEdit = (index) => {
    // Implement edit functionality
  };

  return (
    <Container className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      <header className="App-header">
        <h2>Manage Employees</h2>
        <div className="headBtns">
          <Button variant="danger" className="deleteBtn" onClick={deleteAll}>
            Delete All
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
                  <td>{index + 1}</td>
                  <td style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>{employee.name}</td>
                  <td style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>{employee.email}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{employee.phone}</td>
                  <td className="tableBtns">
                    <Button variant="secondary" style={{ marginRight: "10px" }} onClick={() => handleEdit(index)}>
                      <MdEditSquare style={{ fontSize: "30px" }} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteEmployee(employee._id)}>
                      <MdDeleteForever style={{ fontSize: "30px" }} />
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
