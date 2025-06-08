// services/productService.js
const productRepository = require('../repositories/productRepository');

class ProductService {
    async criarProduto(produtoData) {
        const { titulo, descricao, preco, imagemUrl, categoriaId } = produtoData;
        
        if (!titulo || !descricao || preco === undefined || !imagemUrl || !categoriaId) {
            throw new Error('Todos os campos são obrigatórios');
        }

        return await productRepository.create(produtoData);
    }

    async listarTodosProdutos() {
        return await productRepository.findAll();
    }

    async buscarProdutoPorId(id) {
        const produto = await productRepository.findById(id);
        
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        
        return produto;
    }

    async atualizarProduto(id, produtoData) {
        return await productRepository.update(id, produtoData);
    }

    async deletarProduto(id) {
        return await productRepository.delete(id);
    }
}

module.exports = new ProductService();