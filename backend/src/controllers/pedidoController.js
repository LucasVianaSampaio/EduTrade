const pedidoService = require('../services/pedidoService');

exports.criarPedido = async (req, res) => {
  try {
    const userId = req.user.id;
    const dadosPedido = req.body;
    const pedido = await pedidoService.criarPedido(userId, dadosPedido);
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buscarPedidosPorUsuario = async (req, res) => {
  try {
    const userId = req.user.id;
    const pedidos = await pedidoService.buscarPedidosPorUsuario(userId);
    res.json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 