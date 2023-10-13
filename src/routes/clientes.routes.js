const {Router} = require('express');
const {getAllclientes, getclientes, crearclientes, eliminarclientes, actualizarclientes} = require('../controllers/clientes.controller')



const router = Router();

router.get('/cliente', getAllclientes)

router.get('/cliente/:id_cliente', getclientes)

router.post('/cliente', crearclientes)

router.delete('/cliente/:id_cliente', eliminarclientes)

router.put('/cliente/:id_cliente', actualizarclientes)

module.exports = router;