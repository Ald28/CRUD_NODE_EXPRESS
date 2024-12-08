// Cargar variables de entorno
require('dotenv').config();

// Importar módulos necesarios
const express = require('express');
const fileupload = require('express-fileupload');
const middlewares = require('./middlewares/middlewares'); 
const db = require('./config/db'); 
const personaRoutes = require('./routes/persona.routes'); 
const mascotasRoutes = require('./routes/mascota.routes'); 

// Crear instancia de Express
const app = express();

// Configurar middlewares globales
middlewares(app); // Llama al archivo de middlewares

// Agregar después de la configuración de middlewares
app.use(express.static('src'));


// Conectar a la base de datos
db.connect();

app.use(fileupload({
    useTempFiles: true, // Usar archivos temporales
    tempFileDir: '/tmp/', // Directorio temporal
}));

// Configuración de rutas
app.use('/api', personaRoutes);
app.use('/api', mascotasRoutes);

// Puerto del servidor (desde .env o por defecto en 3000)
const PORT = process.env.PORT || 3000;

// Página de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API con Node.js, Express y MySQL');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
