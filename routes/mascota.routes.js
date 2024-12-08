const express = require('express');
const router = express.Router(); 
const controllermascota = require('../controller/controllermascota');

router.post('/mascotas', controllermascota.createMascota); 
router.get('/mascotas', controllermascota.getMascotas); 
router.get('/mascotas/:id', controllermascota.getMascotaById);
router.put('/mascotas/:id', controllermascota.updateMascota); 
router.delete('/mascotas/:id', controllermascota.deleteMascota); 

// Exportar las rutas para ser utilizadas en el archivo principal (index.js)
module.exports = router;
