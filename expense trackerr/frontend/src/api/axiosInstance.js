import axios from 'axios';

// 1. Define the base URL dynamically
// In development, this will be your local Express server (e.g., http://localhost:5000/api)
// In production (Vercel), you must set the VITE_BACKEND_URL environment variable to your deployed API URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Necessary if using cookies for authentication
});

// 2. Request Interceptor: Attach the JWT token to every outgoing request
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token'); 
        
        if (token) {
            // Attach the token as a Bearer token in the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor (Optional but highly recommended for centralized error handling)
// This lets you catch common errors (like 401 Unauthorized) in one place.
axiosInstance.interceptors.response.use(
    (response) => {
        // Return a successful response
        return response;
    },
    (error) => {
        // Handle common unauthorized errors
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request. Redirecting to login.');
            // This is where you would typically:
            // 1. Clear the token: localStorage.removeItem('token');
            // 2. Redirect the user: window.location.href = '/login';
        }
        
        // Re-throw the error so the component's try...catch block can handle it
        return Promise.reject(error);
    }
);

export default axiosInstance;