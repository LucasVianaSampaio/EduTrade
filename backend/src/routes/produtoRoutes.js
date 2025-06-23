const express = require('express');
const {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduto);
router.get('/', getAllProdutos);
router.get('/:id', getProdutoById);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);

module.exports = router;
