const {Router} = require('express');
const {getAllventa, getventa, crearventa, eliminarventa, actualizarventa} = require('../controllers/ventas.controller')



const router = Router();

router.get('/venta', getAllventa)

router.get('/venta/:id_venta', getventa)

router.post('/venta', crearventa)

router.delete('/venta/:id_venta', eliminarventa)

router.put('/venta/:id_venta', actualizarventa)

module.exports = router;