const pedidoRepository = require('../repositories/pedidoRepository');
const carrinhoRepository = require('../repositories/carrinhoRepository');

class PedidoService {
  async criarPedido(userId, dadosPedido) {
    // Pega os itens do carrinho
    const itensCarrinho = await carrinhoRepository.obterCarrinho(userId);
    if (!itensCarrinho.length) throw new Error('Carrinho vazio');

    // Calcula o total
    const total = itensCarrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

    // Cria o pedido
    const pedido = await pedidoRepository.criarPedido(userId, {
      ...dadosPedido,
      total
    });

    // Adiciona os itens ao pedido
    await pedidoRepository.adicionarItensAoPedido(
      pedido.id,
      itensCarrinho.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco
      }))
    );

    // Limpa o carrinho
    await carrinhoRepository.limparCarrinho(userId);

    return pedido;
  }

  async buscarPedidosPorUsuario(userId) {
    return await pedidoRepository.buscarPedidosPorUsuario(userId);
  }
}

module.exports = new PedidoService(); 

