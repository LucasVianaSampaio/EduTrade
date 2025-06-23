const express = require('express');
const {
    adicionarItem,
    obterCarrinho,
    atualizarQuantidade,
    removerItem,
    limparCarrinho,
} = require('../controllers/carrinhoController')

const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/adicionar',authenticateToken, adicionarItem);
router.get('/', authenticateToken, obterCarrinho);
router.put('/atualizar', authenticateToken, atualizarQuantidade);
router.delete('/remover', authenticateToken, removerItem);
router.delete('/limpar', authenticateToken, limparCarrinho);

module.exports = router; 