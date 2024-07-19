import axios from "axios";

// Function to get employees
const getEmployee = async () => {
  return await axios.get("http://localhost:5000/employee");
};

const postEmployee = async (data) => {
    return await axios.post("http://localhost:5000/employee", data);
  };

// Exporting functions for use in other files
export { getEmployee, postEmployee };
