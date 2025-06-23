const express = require('express');

const {
    criarPedido,
    buscarPedidosPorUsuario
} = require('../controllers/pedidoController')


const router = express.Router();

router.post('/', criarPedido);
router.get('/', buscarPedidosPorUsuario);

module.exports = router; 