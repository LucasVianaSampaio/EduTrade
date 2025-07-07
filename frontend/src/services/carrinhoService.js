import axios from "axios";

const API_URL = "http://localhost:8090";
const CARRINHO_URL = `${API_URL}/api/carrinho`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCarrinho = async () => {
  try {
    const response = await axios.get(`${CARRINHO_URL}/`, getAuthHeader());
    return response?.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar itens do carrinho", error);
    return [];
  }
};

export const adicionarItemAoCarrinho = async (produtoId, quantidade = 1) => {
  try {
    await axios.post(
      `${CARRINHO_URL}/adicionar`,
      { produtoId, quantidade },
      getAuthHeader()
    );
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho", error);
  }
};

export const atualizarQuantidadeItem = async (produtoId, quantidade) => {
  try {
    await axios.put(
      `${CARRINHO_URL}/atualizar`,
      { produtoId, quantidade },
      getAuthHeader()
    );
  } catch (error) {
    console.error("Erro ao atualizar quantidade do item no carrinho", error);
  }
};

export const removerItemDoCarrinho = async (produtoId) => {
  try {
    await axios.delete(`${CARRINHO_URL}/remover`, {
      ...getAuthHeader(),
      data: { produtoId },
    });
  } catch (error) {
    console.error("Erro ao remover item do carrinho", error);
  }
};

export const limparCarrinho = async () => {
  try {
    await axios.delete(`${CARRINHO_URL}/limpar`, getAuthHeader());
  } catch (error) {
    console.error("Erro ao limpar carrinho", error);
  }
};
