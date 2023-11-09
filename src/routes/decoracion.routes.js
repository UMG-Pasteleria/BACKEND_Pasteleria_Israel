const { Router } = require("express");
const {
  getAlldecoracion,
  getDecoracion,
  crearDecoracion,
  actualizarDecoracion,
  eliminarDecoracion,
} = require("../controllers/decoracion.controller");

const router = Router();

router.get("/decoracion", getAlldecoracion);

router.get("/decoracion/:idecpast", getDecoracion);

router.post("/decoracion", crearDecoracion);

router.delete("/decoracion/:idecpast", eliminarDecoracion);

router.put("/decoracion/:idecpast", actualizarDecoracion);

module.exports = router;
