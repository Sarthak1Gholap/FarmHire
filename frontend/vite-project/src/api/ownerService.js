// api/ownerService.js
import axios from 'axios';

const apiUrl = '/api/owners'; // Adjust based on your backend URL

// Get all owners
export const getAllOwners = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Add new owner
export const addOwner = async (owner) => {
  const response = await axios.post(apiUrl, owner);
  return response.data;
};

// Delete owner
export const deleteOwner = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
