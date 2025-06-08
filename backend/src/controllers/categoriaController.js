const categoriaService = require('../services/categoriaService');

async function createCategoria(req, res) {
    try {
        const { nome, descricao } = req.body;
        const categoria = await categoriaService.criarCategoria(nome, descricao);
        return res.status(201).json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function getAllCategorias(req, res) {
    try {
        const categorias = await categoriaService.listarTodasCategorias();
        return res.json(categorias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
}

async function getCategoriaById(req, res) {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.buscarCategoriaPorId(id);
        return res.json(categoria);
    } catch (error) {
        console.error(error);
        if (error.message === 'Categoria não encontrada') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro ao buscar categoria' });
    }
}

async function updateCategoria(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const categoria = await categoriaService.atualizarCategoria(id, nome, descricao);
        return res.json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
}

async function deleteCategoria(req, res) {
    try {
        const { id } = req.params;
        await categoriaService.deletarCategoria(id);
        return res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
        console.error(error);
        if (error.message.includes('Existem produtos associados')) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro ao deletar categoria' });
    }
}

module.exports = {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria
};