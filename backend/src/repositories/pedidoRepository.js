const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PedidoRepository {
  async criarPedido(userId, dadosPedido) {
    try {
      return await prisma.pedido.create({
        data: {
          userId: userId,
          status: dadosPedido.status || 'PENDENTE',
          total: dadosPedido.total,
          endereco: dadosPedido.endereco,
          telefone: dadosPedido.telefone,
          observacoes: dadosPedido.observacoes
        },
        include: {
          pedidoItens: {
            include: {
              produto: {
                include: {
                  categoria: true
                }
              }
            }
          }
        }
      });
    } catch (error) {
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }
  }

  async adicionarItensAoPedido(pedidoId, itens) {
    try {
      const createdItems = await Promise.all(
        itens.map(async (item) => {
          return await prisma.pedidoItem.create({
            data: {
              pedidoId: pedidoId,
              produtoId: item.produtoId,
              quantidade: item.quantidade,
              precoUnitario: item.precoUnitario
            }
          });
        })
      );
      return createdItems;
    } catch (error) {
      throw new Error(`Erro ao adicionar itens ao pedido: ${error.message}`);
    }
  }

  async buscarPedidosPorUsuario(userId) {
    try {
      return await prisma.pedido.findMany({
        where: { userId },
        include: {
          pedidoItens: {
            include: {
              produto: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      throw new Error(`Erro ao buscar pedidos: ${error.message}`);
    }
  }
}

module.exports = new PedidoRepository(); 