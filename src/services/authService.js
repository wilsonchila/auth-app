import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, credentials);
    return {
      user: data.user,
      token: data.token
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error de conexión');
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userData);
    return {
      user: data.user,
      token: data.token
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error de conexión');
  }
};