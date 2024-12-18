// src/apiService.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://check-backend-4.onrender.com/api",
    //     // baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});
const token = localStorage.getItem('token');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Save token to localStorage (or sessionStorage if preferred)
const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Register a new user
export const register = async (userData) => {
    try {
        console.log(userData)
        const response = await axiosInstance.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Login a user
export const login = async (credentials) => {
    console.log("credentials", credentials)
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        const { token } = response.data;
        setAuthToken(token); // Save token and set it in headers
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Logout a user
export const logout = () => {
    setAuthToken(null); // Clear token from storage and headers
};

// Fetch tasks for the logged-in user
export const fetchUserTasks = async (cat) => {
    try {
        const response = await axiosInstance.get(`/todos?cat=${cat}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
};
export const addUserTask = async (data) => {
    try {
        const response = await axiosInstance.post('/todos/', data);
        return response;
    } catch (error) {
        console.error('Error adding task', error);
        throw error;
    }
}
export const deleteTask = async (id) => {
    try {
        const response = await axiosInstance.delete(`/todos/${id}`);
        return response; ``
    } catch (error) {
        console.error('Error deleting task', error);
        throw error;
    }
}

export const updateTask = async (data) => {
    try {
        const response = await axiosInstance.put(`/todos/${data.id}`, data);
        return response;
    } catch (error) {
        console.error('Error on updating task', error);
        throw error;
    }
}
export const setTerminate = async (id) => {
    try {
        const response = await axiosInstance.post(`/todos/${id}`);
        return response;
    } catch (error) {
        console.error('set terminate error', error);
        throw error;
    }
}
export const getStatistics = async () => {
    try {
        const response = await axiosInstance.get("/todos/statistics");

        return response;
    } catch (err) {
        console.error(err)
        throw err
    }
}


export const getCategories = async () => {
    return axiosInstance.get("/categories");
};

// Add a category
export const addCategory = async (name) => {
    return axiosInstance.post("/categories/", { name });
};

// Update category name
export const updateCategory = async (id, name) => {
    return axiosInstance.put(`/ categories / ${id}`, { name });
};

// Delete category
export const deleteCategory = async (id) => {
    return axiosInstance.delete(`/ categories / ${id}`);
};
// Other API functions...
