import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`; // Backend API URL from environment

console.log(BASE_URL)
// Get all alumni
export const getAlumni = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumni`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

// Get single alumni
export const getAlumnus = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/alumni/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

// Add alumni
export const addAlumni = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/alumni`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding alumni:", error);
    throw error;
  }
};

// Update alumni
export const updateAlumni = async (id, data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/alumni/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating alumni:", error);
    throw error;
  }
};

// Delete alumni
export const deleteAlumni = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/alumni/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting alumni:", error);
    throw error;
  }
};

console.log("Backend URL:", BASE_URL);