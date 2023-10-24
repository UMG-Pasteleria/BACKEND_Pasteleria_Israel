const { Router } = require("express");

const {
  getAllpedido,
  getpedido,
  crearpedido,
  actualizarpedido,
  eliminarpedido,
} = require("../controllers/pedidoCliente.controller"); // Importa el controlador de pedidos

const router = Router();

// Ruta para crear un nuevo pedido
router.post("/pedidos", crearpedido);

// Ruta para obtener todos los pedidos
router.get("/pedidos/:idpedido", getpedido);

// Ruta para obtener un pedido por su ID
router.get("/pedidos", getAllpedido);

// Ruta para actualizar un pedido por su ID
router.put("/pedidos/:idpedido", actualizarpedido);

// Ruta para eliminar un pedido por su ID
router.delete("/pedidos/:idpedido", eliminarpedido);

module.exports = router;
