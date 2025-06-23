const carrinhoService = require('../services/carrinhoService');

async function adicionarItem(req, res) {
    try {
        const { produtoId, quantidade } = req.body;
        const userId = req.user.id;
        const item = await carrinhoService.adicionarItem(userId, produtoId, quantidade);
        return res.json(item);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function obterCarrinho(req, res) {
    try {
        const userId = req.user.id;
        const itens = await carrinhoService.obterCarrinho(userId);
        return res.json(itens);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function atualizarQuantidade(req, res) {
    try {
        const { produtoId, quantidade } = req.body;
        const userId = req.user.id;
        const item = await carrinhoService.atualizarQuantidade(userId, produtoId, quantidade);
        return res.json(item);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function removerItem(req, res) {
    try {
        const { produtoId } = req.body;
        const userId = req.user.id;
        await carrinhoService.removerItem(userId, produtoId);
        return res.json({ message: 'Item removido do carrinho' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function limparCarrinho(req, res) {
    try {
        const userId = req.user.id;
        await carrinhoService.limparCarrinho(userId);
        return res.json({ message: 'Carrinho limpo' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    adicionarItem,
    obterCarrinho,
    atualizarQuantidade,
    removerItem,
    limparCarrinho
};
