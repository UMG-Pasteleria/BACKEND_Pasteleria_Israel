const { Router } = require("express");
const {
  getAllpaweb,
  getpaweb,
  crearpaweb,
  eliminarpaweb,
  actualizarpaweb,
} = require("../controllers/pagweb.controller");

const router = Router();

router.get("/estado", getAllpaweb);

router.get("/estado/:idestadop", getpaweb);

router.post("/estado", crearpaweb);

router.delete("/estado/:idestadop", eliminarpaweb);

router.put("/estado/:idestadop", actualizarpaweb);

module.exports = router;
