import axios from "axios";

const API_URL = "http://localhost:8090";

export const getProdutosByFilters = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/produtos/`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos", error);
        return { data: [], total: 0 };
    }
};

export const getProdutoById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/produtos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produto por ID", error);
        return null;
    }
};

export const createProduto = async (produtoData) => {
    try {
        await axios.post(`${API_URL}/api/produtos/`, produtoData);
    } catch (error) {
        console.error("Erro ao criar produto", error);
    }
};

export const updateProduto = async (id, produtoData) => {
    try {
        await axios.put(`${API_URL}/api/produtos/${id}`, produtoData);
    } catch (error) {
        console.error("Erro ao atualizar o produto", error);
    }
};

export const deleteProduto = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/produtos/${id}`);
    } catch (error) {
        console.error("Erro ao deletar o produto", error);
    }
};
