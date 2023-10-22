
const {Router} = require('express');
const {getAllusuarios, getUsuarios, crearUsuarios, eliminarUsuarios, actualizarUsuarios} = require('../controllers/usuarios.contrroller')



const router = Router();

router.get('/usuario', getAllusuarios)

router.get('/usuario/:idusuario', getUsuarios)

router.post('/usuario', crearUsuarios)

router.delete('/usuario/:idusuario', eliminarUsuarios)

router.put('/usuario/:idusuario', actualizarUsuarios)

module.exports = router;