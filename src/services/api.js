import axios from 'axios';

// Default backend URL - can be configured via environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// API service
export const apiService = {
  // Health check
  async checkHealth() {
    const response = await api.get('/health');
    return response.data;
  },

  // Users CRUD
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    await api.delete(`/users/${id}`);
    return true;
  },
};

// Helper to update API base URL dynamically
export const setApiBaseUrl = (url) => {
  api.defaults.baseURL = url;
};

export default api;
