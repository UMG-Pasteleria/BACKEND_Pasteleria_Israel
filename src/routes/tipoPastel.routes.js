const { Router } = require("express");
const {
  getAlltipo,
  getTipo,
  crearTipo,
  actualizarTipo,
  eliminarTipo,
} = require("../controllers/tipoPastel.controller");

const router = Router();

router.get("/tipo", getAlltipo);

router.get("/tipo/:idtpastel", getTipo);

router.post("/tipo", crearTipo);

router.delete("/tipo/:idtpastel", eliminarTipo);

router.put("/tipo/:idtpastel", actualizarTipo);

module.exports = router;
