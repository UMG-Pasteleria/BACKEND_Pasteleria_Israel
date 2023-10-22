const { Router } = require("express");
const {
  getAllmodo_pago,
  getmodo_pago,
  crearmodo_pago,
  eliminarmodo_pago,
  actualizarmodo_pago,
} = require("../controllers/modo_pago.controller");

const router = Router();

router.get("/modo_pago", getAllmodo_pago);

router.get("/modo_pago/:id_modopago", getmodo_pago);

router.post("/modo_pago", crearmodo_pago);

router.delete("/modo_pago/:id_modopago", eliminarmodo_pago);

router.put("/modo_pago/:id_modopago", actualizarmodo_pago);

module.exports = router;
