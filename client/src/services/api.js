import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const complaintService = {
  submitComplaint: async (complaintData) => {
    try {
      const response = await api.post('/complaints', complaintData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  trackComplaint: async (complaintId) => {
    try {
      const response = await api.get(`/complaints/${complaintId}/status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};