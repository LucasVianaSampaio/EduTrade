const pedidoRepository = require('../repositories/pedidoRepository');
const carrinhoRepository = require('../repositories/carrinhoRepository');

class PedidoService {
  async criarPedido(userId, dadosPedido) {
    const itensCarrinho = await carrinhoRepository.listarItensDoCarrinho(userId);
    if (!itensCarrinho.length) throw new Error('Carrinho vazio');

    const total = itensCarrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

    const pedido = await pedidoRepository.criarPedido(userId, {
      ...dadosPedido,
      total
    });

    await pedidoRepository.adicionarItensAoPedido(
      pedido.id,
      itensCarrinho.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco
      }))
    );

    await carrinhoRepository.limparCarrinho(userId);

    return pedido;
  }

  async buscarPedidosPorUsuario(userId) {
    return await pedidoRepository.buscarPedidosPorUsuario(userId);
  }
}

module.exports = new PedidoService(); 

