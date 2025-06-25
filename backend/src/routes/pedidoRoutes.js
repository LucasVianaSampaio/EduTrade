const express = require('express');

const {
    criarPedido,
    buscarPedidosPorUsuario
} = require('../controllers/pedidoController')


const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, criarPedido);
router.get('/', authenticateToken, buscarPedidosPorUsuario);

module.exports = router; 