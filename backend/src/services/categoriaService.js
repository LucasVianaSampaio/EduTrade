const categoriaRepository = require('../repositories/categoriaRepository');
const { gerarSlug } = require('../utils/slugGenerator');

class CategoriaService {
    async criarCategoria(nome, descricao) {
        if (!nome || !descricao) {
            throw new Error('Nome e descrição são obrigatórios');
        }

        const slug = gerarSlug(nome);
        return await categoriaRepository.create(nome, descricao, slug);
    }

    async listarTodasCategorias() {
        return await categoriaRepository.findAll();
    }

    async buscarCategoriaPorId(id) {
        const categoria = await categoriaRepository.findById(id);
        if (!categoria) {
            throw new Error('Categoria não encontrada');
        }
        return categoria;
    }

    async atualizarCategoria(id, nome, descricao) {
        const slug = gerarSlug(nome);
        return await categoriaRepository.update(id, nome, descricao, slug);
    }

    async deletarCategoria(id) {
        const quantidadeProdutos = await categoriaRepository.countProdutosByCategoria(id);
        
        if (quantidadeProdutos > 0) {
            throw new Error('Não é possível deletar a categoria. Existem produtos associados a ela.');
        }

        return await categoriaRepository.delete(id);
    }
}

module.exports = new CategoriaService();