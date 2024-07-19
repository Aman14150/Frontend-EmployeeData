import axios from "axios";

// Function to get employees
const getEmployee = async () => {
  return await axios.get("http://localhost:5000/employee");
};

// Exporting functions for use in other files
export { getEmployee };
