const { Router } = require("express");
const {
  getAllclientes,
  getclientes,
  crearclientes,
  eliminarclientes,
  actualizarclientes,
} = require("../controllers/clientes.controller");

const router = Router();

router.get("/cliente", getAllclientes);

router.get("/cliente/:idcliente", getclientes);

router.post("/cliente", crearclientes);

router.delete("/cliente/:idcliente", eliminarclientes);

router.put("/cliente/:idcliente", actualizarclientes);

module.exports = router;
