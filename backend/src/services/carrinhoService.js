const carrinhoRepository = require('../repositories/carrinhoRepository');

class CarrinhoService {
    async adicionarItem(userId, produtoId, quantidade = 1) {
        if (!produtoId || quantidade <= 0) {
            throw new Error('Produto e quantidade válidos são obrigatórios');
        }

        const carrinho = await carrinhoRepository.listarItensDoCarrinho(userId);
        const itemExistente = carrinho.find(item => item.produtoId === produtoId);

        if (itemExistente) {
            const novaQuantidade = itemExistente.quantidade + quantidade;
            return await carrinhoRepository.atualizarQuantidade(userId, produtoId, novaQuantidade);
        }

        return await carrinhoRepository.criarItem(userId, produtoId, quantidade);
    }

    async obterCarrinho(userId) {
        return await carrinhoRepository.listarItensDoCarrinho(userId);
    }

    async atualizarQuantidade(userId, produtoId, quantidade) {
        if (!produtoId || quantidade < 0) {
            throw new Error('Produto e nova quantidade são obrigatórios');
        }

        if (quantidade === 0) {
            return await this.removerItem(userId, produtoId);
        }

        return await carrinhoRepository.atualizarQuantidade(userId, produtoId, quantidade);
    }

    async removerItem(userId, produtoId) {
        if (!produtoId) {
            throw new Error('ProdutoId é obrigatório para remover item');
        }

        return await carrinhoRepository.removerItem(userId, produtoId);
    }

    async limparCarrinho(userId) {
        return await carrinhoRepository.limparCarrinho(userId);
    }

    async obterTotalCarrinho(userId) {
        const itens = await carrinhoRepository.listarItensDoCarrinho(userId);

        return itens.reduce((total, item) => {
            return total + item.quantidade * item.produto.preco;
        }, 0);
    }
}

module.exports = new CarrinhoService();
