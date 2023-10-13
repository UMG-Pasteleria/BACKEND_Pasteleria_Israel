const {Router} = require('express');
const {getallproveedores, getproveedores, crearproveedores, eliminarproveedores, actualizarproveedores} = require('../controllers/proveedores.controller')



const router = Router();

router.get('/proveedor', getallproveedores)

router.get('/proveedor/:idprov', getproveedores)

router.post('/proveedor', crearproveedores)

router.delete('/proveedor/:idprov', eliminarproveedores)

router.put('/proveedor/:idprov', actualizarproveedores)

module.exports = router;