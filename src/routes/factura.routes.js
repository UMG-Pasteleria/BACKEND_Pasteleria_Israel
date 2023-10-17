const {Router} = require('express');
const {getAllfactura, getfactura, crearfactura, eliminarfactura, actualizarfactura} = require('../controllers/factura.controller')



const router = Router();

router.get('/factura', getAllfactura)

router.get('/factura/:num_factura', getfactura)

router.post('/factura', crearfactura)

router.delete('/factura/:num_factura', eliminarfactura)

router.put('/factura/:num_factura', actualizarfactura)

module.exports = router;