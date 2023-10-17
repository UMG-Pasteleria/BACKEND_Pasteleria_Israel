const { Router } = require("express");
const {
  getallproveedores,
  getproveedores,
  crearproveedores,
  eliminarproveedores,
  actualizarproveedores,
} = require("../controllers/proveedores.controller");

const router = Router();

router.get("/proveedores", getallproveedores);

router.get("/proveedores/:idprov", getproveedores);

router.post("/proveedores", crearproveedores);

router.delete("/proveedores/:idprov", eliminarproveedores);

router.put("/proveedores/:idprov", actualizarproveedores);

module.exports = router;
