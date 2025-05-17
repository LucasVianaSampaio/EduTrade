const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createProduto(req, res) {
    const { titulo, descricao, preco, imagemUrl, categoriaId, disponivel } = req.body;

    if (!titulo || !descricao || preco === undefined || !imagemUrl || !categoriaId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const produto = await prisma.produto.create({
            data: {
                titulo,
                descricao,
                preco: parseFloat(preco),
                imagemUrl,
                disponivel: disponivel !== undefined ? disponivel : true,
                categoria: { connect: { id: parseInt(categoriaId) } }
            }
        });

        return res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar produto' });
    }
}

async function getAllProdutos(req, res) {
    try {
        const produtos = await prisma.produto.findMany({ include: { categoria: true } });
        return res.json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}

async function getProdutoById(req, res) {
    const { id } = req.params;

    try {
        const produto = await prisma.produto.findUnique({
            where: { id: parseInt(id) },
            include: { categoria: true }
        });

        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

        return res.json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produto' });
    }
}

async function updateProduto(req, res) {
    const { id } = req.params;
    const { titulo, descricao, preco, imagemUrl, categoriaId, disponivel } = req.body;

    try {
        const produto = await prisma.produto.update({
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

        return res.json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
}

async function deleteProduto(req, res) {
    const { id } = req.params;

    try {
        await prisma.produto.delete({ where: { id: parseInt(id) } });
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
    deleteProduto,
};
