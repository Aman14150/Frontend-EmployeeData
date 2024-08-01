// src/axios/AxiosAuth.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const loginUser = async (email, password) => {
  return await axiosInstance.post("/auth/login", { email, password });
};

export const registerUser = async (name, email, password) => {
  return await axiosInstance.post("/auth/register", { name, email, password });
};
