const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoCliente.controller'); // Importa el controlador de pedidos

// Ruta para crear un nuevo pedido
router.post('/pedidos', pedidoController.crearPedido);

// Ruta para obtener todos los pedidos
router.get('/pedidos', pedidoController.obtenerPedidos);

// Ruta para obtener un pedido por su ID
router.get('/pedidos/:id', pedidoController.obtenerPedidoPorId);

// Ruta para actualizar un pedido por su ID
router.put('/pedidos/:id', pedidoController.actualizarPedido);

// Ruta para eliminar un pedido por su ID
router.delete('/pedidos/:id', pedidoController.eliminarPedido);

module.exports = router;
