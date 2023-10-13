const {Router} = require('express');
const {getallcompras, getcompras, crearcompras, eliminarcompras, actualizarcompras} = require('../controllers/compras.controller')



const router = Router();

router.get('/compras', getallcompras)

router.get('/compras/:idcompras', getcompras)

router.post('/compras', crearcompras)

router.delete('/compras/:idcompras', eliminarcompras)

router.put('/compras/:idcompras', actualizarcompras)

module.exports = router;
