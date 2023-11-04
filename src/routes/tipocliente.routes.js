const { Router } = require("express");
const {
  getAlltipocliente,
  gettipocliente,
  creartipocliente,
  eliminartipocliente,
  actualizartipocliente,
} = require("../controllers/tipocliente.controller");

const router = Router();

router.get("/tipo_cliente", getAlltipocliente);

router.get("/tipo_cliente/:idtcl", gettipocliente);

router.post("/tipo_cliente", creartipocliente);

router.delete("/tipo_cliente/:idtcl", eliminartipocliente);

router.put("/tipo_cliente/:idtcl", actualizartipocliente);

module.exports = router;
