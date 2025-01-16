import axios from 'axios';

// Set up the Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Fallback to localhost if no .env variable
});

// Add a request interceptor to add JWT token to headers if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or you can use Redux to get token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Fixed template string syntax here
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
