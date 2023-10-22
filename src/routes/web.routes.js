const { Router } = require("express");
const {
  getAllweb,
  getWeb,
  crearWeb,
  actualizarWeb,
  eliminarWeb,
} = require("../controllers/web.controller");

const router = Router();

router.get("/web", getAllweb);

router.get("/web/:idtipo_cliente", getWeb);

router.post("/web", crearWeb);

router.delete("/web/:idtipo_cliente", eliminarWeb);

router.put("/web/:idtipo_cliente", actualizarWeb);

module.exports = router;
