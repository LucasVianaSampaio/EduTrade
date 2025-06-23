const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CarrinhoRepository {
  async encontrarItemPorUsuarioEProduto(userId, produtoId) {
    return await prisma.carrinhoItem.findUnique({
      where: {
        userId_produtoId: {
          userId,
          produtoId
        }
      }
    });
  }

  async criarItem(userId, produtoId, quantidade = 1) {
    return await prisma.carrinhoItem.create({
      data: {
        userId,
        produtoId,
        quantidade
      },
      include: {
        produto: {
          include: { categoria: true }
        }
      }
    });
  }

  async atualizarQuantidade(userId, produtoId, novaQuantidade) {
    return await prisma.carrinhoItem.update({
      where: {
        userId_produtoId: {
          userId,
          produtoId
        }
      },
      data: {
        quantidade: novaQuantidade
      },
      include: {
        produto: {
          include: { categoria: true }
        }
      }
    });
  }

  async removerItem(userId, produtoId) {
    return await prisma.carrinhoItem.delete({
      where: {
        userId_produtoId: {
          userId,
          produtoId
        }
      }
    });
  }

  async limparCarrinho(userId) {
    return await prisma.carrinhoItem.deleteMany({
      where: {
        userId
      }
    });
  }

  async listarItensDoCarrinho(userId) {
    return await prisma.carrinhoItem.findMany({
      where: {
        userId
      },
      include: {
        produto: {
          include: { categoria: true }
        }
      }
    });
  }
}

module.exports = new CarrinhoRepository();
