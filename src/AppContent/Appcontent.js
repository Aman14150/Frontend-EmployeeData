import React, { useState, useEffect } from "react";
import "./AppContent.css";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import {
  getEmployee,
  postEmployee,
  deleteAllEmployees,
  deleteEmployee,
  putEmployee,
} from "../Axios/AxiosServer";

function Appcontent() {
  // State variables
  const [showForm, setShowForm] = useState(false); // To show or hide the form
  const [employees, setEmployees] = useState([]); // List of employees
  const [name, setName] = useState(""); // Name input field
  const [email, setEmail] = useState(""); // Email input field
  const [phone, setPhone] = useState(""); // Phone input field
  const [error, setError] = useState(null); // To show error messages
  const [searchQuery, setSearchQuery] = useState(""); // Search input field
  const [editId, setEditId] = useState(null); // ID of the employee being edited
  const [editMode, setEditMode] = useState(false); // To toggle between add and edit modes
  const [notFoundAlert, setNotFoundAlert] = useState(false); // To show "Employee Not Found" alert
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [totalPages, setTotalPages] = useState(0); // Add state for total pages
  const itemsPerPage = 5; // Number of employees per page

  // Function to fetch employees from the server
  useEffect(() => {
    fetchEmployees(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  // Function to fetch employees from the server with an optional search query and pagination
  const fetchEmployees = async (search = "", page = 1) => {
    try {
      const response = await getEmployee(search, page, itemsPerPage);
      console.log("Employee data:", response.data); // Add this line
      setEmployees(response.data.contacts || []);
      setTotalPages(Math.ceil(response.data.totalContacts / itemsPerPage));
    } catch (error) {
      console.error("Error fetching employees:", error); // Add this line
      setError("Error fetching employees");
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError(null);
  };

  const addEmployee = async () => {
    // Check if all fields are filled
    if (!name || !email || !phone) {
      setError("All fields are required"); // Show an error message if any field is empty
      return;
    }
    const newEmployee = { name, email, phone };

    try {
      // Send the new employee data to the server
      const response = await postEmployee(newEmployee);

      setEmployees([...employees, response.data.data]);
      resetForm();
      setShowForm(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "DuplicateEmail"
      ) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("Error adding employee");
      }
    }
  };

  // Function to delete all employees
  const deleteAllEmployeesHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all employees?"
    );
    if (!confirmed) return;

    try {
      await deleteAllEmployees();
      setEmployees([]);
    } catch (error) {
      setError("Error deleting employees");
    }
  };

  // Function to delete a specific employee
  const deleteEmployeeHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete employee data?"
    );
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee._id !== id)); // If true, keep the employee; if false, exclude the employee
    } catch (error) {
      setError("Error deleting employee");
    }
  };

  // Function to update an existing employee
  const updateEmployee = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to Update employee data?"
    );
    if (!confirmed) return;

    if (editId === null) return; // Check if there's an employee being edited
    if (!name || !email || !phone) {
      setError("All fields are required");
      return;
    }
    const updatedEmployee = { name, email, phone };
    try {
      await putEmployee(editId, updatedEmployee);
      setEmployees(
        employees.map((employee) =>
          employee._id === editId
            ? { ...employee, ...updatedEmployee }
            : employee
        )
      );
      resetForm();
      setEditMode(false);
      setEditId(null);
      setShowForm(false);
    } catch (error) {
      setError("Error updating employee");
    }
  };

  // Function to set up the form for editing an employee
  const startEditing = (employeeId) => {
    const employeeToEdit = employees.find(
      (employee) => employee._id === employeeId
    );
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setPhone(employeeToEdit.phone);
      setEditMode(true);
      setEditId(employeeId);
      setShowForm(true);
    }
  };

  // Function to handle search input
  const searchEmployees = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Search operation from frontend
  // // Filter employees based on the search query
  // const filteredEmployees = employees
  //   .filter(
  //     (employee) =>
  //       employee.name.toLowerCase().includes(searchQuery) ||
  //       employee.email.toLowerCase().includes(searchQuery) ||
  //       employee.phone.toLowerCase().includes(searchQuery)
  //   )
  //   .sort((a, b) => a.name.localeCompare(b.name)); // Sort employees by name

  useEffect(() => {
    if (searchQuery && employees.length === 0) {
      setNotFoundAlert(true);
    } else {
      setNotFoundAlert(false);
    }
  }, [searchQuery, employees]);

  // Handler for pagination controls
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container className="container">
      {error && <Alert variant="danger">{error}</Alert>}

      <header className="App-header">
        <h2>Manage Employees</h2>
        <div className="search-box-container">
          <Form.Control
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchQuery}
            onChange={searchEmployees}
            className="search-box"
          />
          {notFoundAlert && <Alert variant="warning">Employee Not Found</Alert>}
        </div>

        <div className="headBtns">
          <Button
            variant="danger"
            className="deleteBtn"
            onClick={deleteAllEmployeesHandler}
          >
            Delete All
          </Button>
          <Button
            variant="success"
            className="addBtn"
            onClick={() => setShowForm(!showForm)}
          >
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
          <Button
            variant="primary"
            onClick={editMode ? updateEmployee : addEmployee}
          >
            {editMode ? "Update" : "Submit"}
          </Button>{" "}
          <Button variant="secondary" onClick={resetForm}>
            Clear
          </Button>
        </Form>
      )}

      {employees.length > 0 && (
        <div className="employee-container" style={{ marginBottom: "20px" }}>
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
                <tr key={employee._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td className="tableBtns">
                    <Button
                      variant="secondary"
                      style={{ marginRight: "10px" }}
                      onClick={() => startEditing(employee._id)}
                    >
                      <MdEditSquare style={{ fontSize: "30px" }} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteEmployeeHandler(employee._id)}
                    >
                      <MdDeleteForever style={{ fontSize: "30px" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination-controls">
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default Appcontent;
