const { Router } = require("express");
const {
  getPastelesVendidos,
  getVentas,
} = require("../controllers/reporte.controller");

const router = Router();

router.get("/pastelesvendidos", getPastelesVendidos);
router.get("/totalventas", getVentas);

module.exports = router;
