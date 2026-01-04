import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Task API functions
export const taskAPI = {
  // Get all tasks with optional search and filter
  getAll: async (search = '', status = '') => {
    const params = {};
    if (search) params.search = search;
    if (status) params.status = status;

    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get single task
  getOne: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  update: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;

