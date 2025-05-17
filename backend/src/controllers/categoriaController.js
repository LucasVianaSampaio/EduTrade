const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para gerar slug a partir do nome
function gerarSlug(nome) {
    return nome
        .toLowerCase()
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '') // Remove marcas Unicode restantes
        .replace(/\s+/g, '-') // Substitui espaços por hífen
        .replace(/[^\w\-]+/g, '') // Remove caracteres não alfanuméricos
        .replace(/\-\-+/g, '-') // Remove hífens duplicados
        .replace(/^-+|-+$/g, ''); // Remove hífens das extremidades
}

async function createCategoria(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
    }

    try {
        const slug = gerarSlug(nome);

        const categoria = await prisma.categoria.create({
            data: { nome, descricao, slug },
        });

        return res.status(201).json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar categoria' });
    }
}

async function getAllCategorias(req, res) {
    try {
        const categorias = await prisma.categoria.findMany();
        return res.json(categorias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
}

async function getCategoriaById(req, res) {
    const { id } = req.params;

    try {
        const categoria = await prisma.categoria.findUnique({ where: { id: parseInt(id) } });

        if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

        return res.json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar categoria' });
    }
}

async function updateCategoria(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
        const slug = gerarSlug(nome);

        const categoria = await prisma.categoria.update({
            where: { id: parseInt(id) },
            data: { nome, descricao, slug },
        });

        return res.json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
}

async function deleteCategoria(req, res) {
    const { id } = req.params;

    try {
        const produtosRelacionados = await prisma.produto.findMany({
            where: { categoriaId: parseInt(id) },
        });

        if (produtosRelacionados.length > 0) {
            return res.status(400).json({
                message: 'Não é possível deletar a categoria. Existem produtos associados a ela.',
            });
        }

        await prisma.categoria.delete({ where: { id: parseInt(id) } });

        return res.json({ message: 'Categoria deletada com sucesso' });

    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        return res.status(500).json({ message: 'Erro ao deletar categoria' });
    }
}

module.exports = {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria,
};
