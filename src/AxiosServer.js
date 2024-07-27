import axios from "axios";

// Function to get employees with optional search query
const getEmployee = async (search = "") => {
  return await axios.get("http://localhost:5000/employee", {
    params: { search }
  });
};

// Function to post a new employee
const postEmployee = async (data) => {
  return await axios.post("http://localhost:5000/employee", data);
};

// Function to delete all employees
const deleteAllEmployees = async () => {
  return await axios.delete("http://localhost:5000/employee");
};

// Function to delete a specific employee by ID
const deleteEmployee = async (id) => {
  return await axios.delete(`http://localhost:5000/employee/${id}`);
};

// Function to update a specific employee by ID
const putEmployee = async (id, data) => {
  return await axios.put(`http://localhost:5000/employee/${id}`, data);
};

// Exporting functions for use in other files
export { getEmployee, postEmployee, deleteAllEmployees, deleteEmployee, putEmployee };
