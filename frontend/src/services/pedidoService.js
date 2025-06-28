import axios from "axios";

const API_URL = "http://localhost:8090";
const PEDIDOS_URL = `${API_URL}/api/pedidos`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const criarPedido = async (dadosPedido) => {
  try {
    const response = await axios.post(PEDIDOS_URL, dadosPedido, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Erro ao criar pedido";
  }
};

export const buscarPedidos = async () => {
  try {
    const response = await axios.get(PEDIDOS_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Erro ao buscar pedidos";
  }
};