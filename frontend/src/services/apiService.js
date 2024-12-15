// services/apiService.js
import axios from 'axios';

// Base URL for the backend API (you can adjust this as per your setup)
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register a new user
const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

// Login an existing user
const loginUser = (userData) => {
  return api.post('/auth/login', userData);
};

// Create a new campaign
const createCampaign = (campaignData, token) => {
  return api.post('/campaigns/create', campaignData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get all campaigns
const getAllCampaigns = () => {
  return api.get('/campaigns');
};

// Get a specific campaign by ID
const getCampaignById = (id) => {
  return api.get(`/campaigns/${id}`);
};

// Donate to a campaign
const donateToCampaign = (id, donationData, token) => {
  return api.post(`/campaigns/${id}/donate`, donationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  registerUser,
  loginUser,
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  donateToCampaign,
};
