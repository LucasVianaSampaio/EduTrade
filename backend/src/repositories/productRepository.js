const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductRepository {
    async create({ titulo, descricao, preco, imagemUrl, categoriaId, disponivel }) {
        return await prisma.produto.create({
            data: {
                titulo,
                descricao,
                preco: parseFloat(preco),
                imagemUrl,
                disponivel: disponivel !== undefined ? disponivel : true,
                categoria: { connect: { id: parseInt(categoriaId) } }
            }
        });
    }

    async findAll() {
        return await prisma.produto.findMany({
            include: { categoria: true }
        });
    }

    async findById(id) {
        return await prisma.produto.findUnique({
            where: { id: parseInt(id) },
            include: { categoria: true }
        });
    }

    async update(id, { titulo, descricao, preco, imagemUrl, categoriaId, disponivel }) {
        return await prisma.produto.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                descricao,
                preco: parseFloat(preco),
                imagemUrl,
                disponivel,
                categoria: { connect: { id: parseInt(categoriaId) } }
            }
        });
    }

    async delete(id) {
        return await prisma.produto.delete({
            where: { id: parseInt(id) }
        });
    }
}

module.exports = new ProductRepository();