const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller'); // Importa el controlador de productos

// Ruta para obtener todos los productos
router.get('/producto', productoController.obtenerProductos);

// Ruta para crear un nuevo producto
router.post('/producto', productoController.crearProducto);

// Ruta para obtener un producto por su ID
router.get('/producto:id', productoController.obtenerProductoPorId);

// Ruta para actualizar un producto por su ID
router.put('/producto:id', productoController.actualizarProducto);

// Ruta para eliminar un producto por su ID
router.delete('/producto:id', productoController.eliminarProducto);

module.exports = router;
