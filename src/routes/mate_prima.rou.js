const {Router} = require('express');
const {getAllmate_prima, getmate_prima, crearmate_prima, eliminarmate_prima, actualizarmate_prima} = require('../controllers/mate_prima.controller')



const router = Router();

router.get('/mate_prima', getAllmate_prima)

router.get('/mate_prima/:id_mateprima', getmate_prima)

router.post('/mate_prima', crearmate_prima)

router.delete('/mate_prima/:id_mateprima', eliminarmate_prima)

router.put('/mate_prima/:id_mateprima', actualizarmate_prima)

module.exports = router;