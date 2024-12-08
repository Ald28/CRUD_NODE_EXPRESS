const express = require('express');
const router = express.Router(); 
const controllerPersona = require('../controller/controllerpersona');

router.post('/personas', controllerPersona.createPersona); 
router.get('/personas', controllerPersona.getPersonas); 
router.get('/personas/:id', controllerPersona.getPersonaById);
router.put('/personas/:id', controllerPersona.updatePersona); 
router.delete('/personas/:id', controllerPersona.deletePersona); 

// Exportar las rutas para ser utilizadas en el archivo principal (index.js)
module.exports = router;
