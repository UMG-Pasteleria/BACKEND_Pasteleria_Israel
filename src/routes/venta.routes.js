const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller'); // Importa el controlador de ventas

// Ruta para crear una nueva venta
router.post('/venta', ventaController.crearVenta);

// Ruta para obtener todas las ventas
router.get('/venta', ventaController.obtenerVentas);

// Ruta para obtener una venta por su ID
router.get('/venta/:id', ventaController.obtenerVentaPorId);

// Ruta para actualizar una venta por su ID
router.put('/venta/:id', ventaController.actualizarVenta);

// Ruta para eliminar una venta por su ID
router.delete('/venta/:id', ventaController.eliminarVenta);

module.exports = router;
