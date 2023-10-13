const {Router} = require('express');
const {getAlltipocliente, gettipocliente, creartipocliente, eliminartipocliente, actualizartipocliente} = require('../controllers/tipocliente.controller')



const router = Router();

router.get('/tipo_cliente', getAlltipocliente)

router.get('/tipo_cliente/:idtipo_cliente', gettipocliente)

router.post('/tipo_cliente', creartipocliente)

router.delete('/tipo_cliente/:idtipo_cliente', eliminartipocliente)

router.put('/tipo_cliente/:idtipo_cliente', actualizartipocliente)

module.exports = router;
