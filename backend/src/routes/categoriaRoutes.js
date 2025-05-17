const express = require('express');
const {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria,
} = require('../controllers/categoriaController');

const router = express.Router();

router.post('/', createCategoria);
router.get('/', getAllCategorias);
router.get('/:id', getCategoriaById);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

module.exports = router;
