import axios from 'axios';

// Create a new Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Replace with your Django backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access'); // Assuming JWT is stored in localStorage

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
