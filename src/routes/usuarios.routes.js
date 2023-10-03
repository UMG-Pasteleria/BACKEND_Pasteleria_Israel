const {Router} = require('express');
const {getAllusuarios, getUsuarios, crearUsuarios, eliminarUsuarios, actualizarUsuarios} = require('../controllers/usuarios.contrroller')



const router = Router();

router.get('/usuario', getAllusuarios)

router.get('/usuario/:iduser', getUsuarios)

router.post('/usuario', crearUsuarios)

router.delete('/usuario/:iduser', eliminarUsuarios)

router.put('/usuario/:iduser', actualizarUsuarios)

module.exports = router;
