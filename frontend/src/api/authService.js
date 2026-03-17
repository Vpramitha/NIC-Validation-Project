import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; // Your backend URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // Ensure a consistent error object
    console.log(error.toString());
    throw error.response?.data || { message: error.message || "Something went wrong" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // contains token or user info
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/create-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      email: email,
      OTP: otp
    });

    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resetPassword = async (email,OTP, password) => {
  try {

    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
      OTP,
      password
    });

    return response.data;

  } catch (error) {

    throw error.response?.data || error;

  }
};
