const {Router} = require('express');
const {getAllproducto, getproducto, crearproducto, eliminarproducto, actualizarproducto} = require('../controllers/productos.controller')



const router = Router();

router.get('/producto', getAllproducto)

router.get('/producto/:id_producto', getproducto)

router.post('/producto', crearproducto)

router.delete('/producto/:id_producto', eliminarproducto)

router.put('/producto/:id_producto', actualizarproducto)

module.exports = router;
