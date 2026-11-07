const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
router.post('/pedido', pedidosController.registrarPedido);
module.exports = router;