const {Router} = require('express');
const {getAllpaweb, getpaweb, crearpaweb, eliminarpaweb, actualizarpaweb} = require('../controllers/pagweb.controller')



const router = Router();

router.get('/paginaweb', getAllpaweb)

router.get('/paginaweb/:id_pagiweb', getpaweb)

router.post('/paginaweb', crearpaweb)

router.delete('/paginaweb/:id_pagiweb', eliminarpaweb)

router.put('/paginaweb/:id_pagiweb', actualizarpaweb)

module.exports = router;