const { Router } = require("express");
const {
  getAllpsatel,
  getpsatel,
  crearpsatel,
  actualizarpsatel,
  eliminarpsatel,
} = require("../controllers/pasteles.controller");

const router = Router();

router.get("/pastel", getAllpsatel);

router.get("/pastel/:idpastel", getpsatel);

router.post("/pastel", crearpsatel);

router.delete("/pastel/:idpastel", actualizarpsatel);

router.put("/pastel/:idpastel", eliminarpsatel);

module.exports = router;
