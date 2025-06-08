// repositories/categoriaRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoriaRepository {
    async create(nome, descricao, slug) {
        return await prisma.categoria.create({
            data: { nome, descricao, slug }
        });
    }

    async findAll() {
        return await prisma.categoria.findMany();
    }

    async findById(id) {
        return await prisma.categoria.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async update(id, nome, descricao, slug) {
        return await prisma.categoria.update({
            where: { id: parseInt(id) },
            data: { nome, descricao, slug }
        });
    }

    async delete(id) {
        return await prisma.categoria.delete({
            where: { id: parseInt(id) }
        });
    }

    async countProdutosByCategoria(id) {
        return await prisma.produto.count({
            where: { categoriaId: parseInt(id) }
        });
    }
}

module.exports = new CategoriaRepository();