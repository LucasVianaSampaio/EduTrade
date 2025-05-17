import axios from "axios";

const API_URL = "http://localhost:8090";

export const getCategoriasByFilters = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/categorias/`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar categoria", error);
        return { data: [], total: 0 };
    }
};

export const getCategoriaById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/categorias/${id}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar categoria por ID", error);
        return null;
    }
};

export const createCategoria = async (categoriaData) => {
    try {
        await axios.post(`${API_URL}/api/categorias/`, categoriaData);
    } catch (error) {
        console.error("Erro ao criar categoria", error);
    }
};

export const updateCategoria = async (id, categoriaData) => {
    try {
        await axios.put(`${API_URL}/api/categorias/${id}`, categoriaData);
    } catch (error) {
        console.error("Erro ao atualizar a categoria", error);
    }
};

export const deleteCategoria = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/categorias/${id}`);
    } catch (error) {
        console.error("Erro ao deletar a categoria", error);
    }
};