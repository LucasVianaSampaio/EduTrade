import axios from 'axios';

const API_URL = 'http://localhost:8090';

export const register = async (name, cpf, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, { name, cpf, email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    if (error.response) {
      return { success: false, message: error.response.data.message || 'Erro ao registrar usuário' };
    } else if (error.request) {
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    } else {
      return { success: false, message: 'Erro ao configurar a requisição.' };
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    if (error.response) {
      return { success: false, message: error.response.data.message || 'Erro ao fazer login' };
    } else if (error.request) {
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    } else {
      return { success: false, message: 'Erro ao configurar a requisição.' };
    }
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return { success: false, message: 'Token não encontrado' };
  }

  try {
    const response = await axios.get(`${API_URL}/api/users/profile`, {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    if (error.response) {
      return { success: false, message: error.response.data.message || 'Erro ao obter perfil' };
    } else if (error.request) {
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    } else {
      return { success: false, message: 'Erro ao configurar a requisição.' };
    }
  }
};

export const updateProfile = async (name, cpf, email) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${API_URL}/api/users/update`,
      { name, cpf, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    if (error.response) {
      return { success: false, message: error.response.data.message || 'Erro ao atualizar perfil' };
    } else if (error.request) {
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    } else {
      return { success: false, message: 'Erro ao configurar a requisição.' };
    }
  }
};