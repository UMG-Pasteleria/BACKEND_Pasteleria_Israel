const { Router } = require("express");
const {
  getAlltamanio,
  getTamanio,
  crearTamanio,
  actualizarTamanio,
  eliminarTamanio,
} = require("../controllers/tamanioPastel.controller");

const router = Router();

router.get("/tamanio", getAlltamanio);

router.get("/tamanio/:idtampast", getTamanio);

router.post("/tamanio", crearTamanio);

router.delete("/tamanio/:idtampast", eliminarTamanio);

router.put("/tamanio/:idtampast", actualizarTamanio);

module.exports = router;
