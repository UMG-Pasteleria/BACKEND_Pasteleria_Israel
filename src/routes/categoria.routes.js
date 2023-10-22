const {Router} = require('express');
const {getAllcategoria, getcategoria, crearcategoria, eliminarcategoria, actualizarcategoria} = require('../controllers/categoria.controller')



const router = Router();

router.get('/categoria', getAllcategoria)

router.get('/categoria/:id_categoria', getcategoria)

router.post('/categoria', crearcategoria)

router.delete('/categoria/:id_categoria', eliminarcategoria)

router.put('/categoria/:id_categoria', actualizarcategoria)

module.exports = router;



