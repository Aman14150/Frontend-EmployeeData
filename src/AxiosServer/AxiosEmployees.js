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

export const getEmployee = async (search = "", page = 1, limit = 5) => {
  return await axiosInstance.get("/employees", {
    params: { search, page, limit }
  });
};

export const postEmployee = async (employee) => {
  return await axiosInstance.post("/employees", employee);
};

export const deleteAllEmployees = async () => {
  return await axiosInstance.delete("/employees");
};

export const deleteEmployee = async (id) => {
  return await axiosInstance.delete(`/employees/${id}`);
};

export const putEmployee = async (id, updatedEmployee) => {
  return await axiosInstance.put(`/employees/${id}`, updatedEmployee);
};
