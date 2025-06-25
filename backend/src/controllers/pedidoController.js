const pedidoService = require('../services/pedidoService');

async function criarPedido(req, res) {
    try {
        const userId = req.user.id;
        const dadosPedido = req.body;
        const pedido = await pedidoService.criarPedido(userId, dadosPedido);
        return res.json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function buscarPedidosPorUsuario(req, res) {
    try {
        const userId = req.user.id;
        const pedidos = await pedidoService.buscarPedidosPorUsuario(userId);
        return res.json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    criarPedido,
    buscarPedidosPorUsuario
};
