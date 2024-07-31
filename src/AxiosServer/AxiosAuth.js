import axios from 'axios';

// Create an Axios instance with a base URL from environment variables
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL // Ensure this is correct
});

console.log('Axios baseURL:', axiosInstance.defaults.baseURL);

// Function to log in a user
export const loginUser = async (email, password) => {
  return await axiosInstance.post("/auth/login", { email, password }); // Correct endpoint
};

// Function to register a new user
export const registerUser = async (email, password) => {
  return await axiosInstance.post("/auth/register", { email, password }); // Correct endpoint
};
