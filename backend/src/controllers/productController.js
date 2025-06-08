// controllers/productController.js
const productService = require('../services/productService');

async function createProduto(req, res) {
    try {
        const produto = await productService.criarProduto(req.body);
        return res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function getAllProdutos(req, res) {
    try {
        const produtos = await productService.listarTodosProdutos();
        return res.json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}

async function getProdutoById(req, res) {
    try {
        const { id } = req.params;
        const produto = await productService.buscarProdutoPorId(id);
        return res.json(produto);
    } catch (error) {
        console.error(error);
        if (error.message === 'Produto não encontrado') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro ao buscar produto' });
    }
}

async function updateProduto(req, res) {
    try {
        const { id } = req.params;
        const produto = await productService.atualizarProduto(id, req.body);
        return res.json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;
        await productService.deletarProduto(id);
        return res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar produto' });
    }
}

module.exports = {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};