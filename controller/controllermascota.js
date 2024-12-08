const mascotaModel = require('../model/mascota');
const cloudinary = require('../config/cloudinary');

// Crear una nueva mascota
const createMascota = async (req, res) => {
    const { nombre, apodo, edad } = req.body;

    // Verificar que se haya recibido un archivo
    if (!nombre || !apodo || !edad || !req.files || !req.files.foto) {
        return res.status(400).json({ message: 'Faltan campos requeridos: nombre, apodo, edad, foto' });
    }

    const foto = req.files.foto;

    try {
        // Subir la foto a Cloudinary
        const uploaded = await cloudinary.uploader.upload(foto.tempFilePath, {
            folder: 'mascotas', // Puedes organizar las fotos en una carpeta de Cloudinary
        });

        // Extraer la URL segura de la foto
        const { secure_url } = uploaded;

        // Llamar al modelo para guardar la mascota con la URL de la foto
        mascotaModel.crearMascota(nombre, apodo, edad, secure_url, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear la mascota', error: err });
            }
            res.status(201).json({ message: 'Mascota creada con éxito', id: result.insertId });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al subir la foto', error });
    }
};

// Obtener todas las mascotas
const getMascotas = (req, res) => {
    mascotaModel.obtenerMascotas((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las mascotas', error: err });
        }
        res.json(result);
    });
};

// Obtener una mascota por ID
const getMascotaById = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({ message: 'Falta el ID de la mascota' });
    }

    mascotaModel.obtenerMascotaPorId(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la mascota', error: err });
        }

        if (!result.length) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        res.json(result[0]);
    });
};

// Actualizar una mascota
const updateMascota = (req, res) => {
    const { nombre, apodo, edad, foto } = req.body;
    const id = req.params.id;

    // Validación simple
    if (!nombre || !apodo || !edad || !foto) {
        return res.status(400).json({ message: 'Faltan campos requeridos: nombre, apodo, edad, foto' });
    }

    mascotaModel.actualizarMascota(id,nombre, apodo, edad, foto, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar mascota', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada para actualizar' });
        }
        res.json({ message: 'Mascota actualizada' });
    });
};

// Eliminar una mascota
const deleteMascota = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({ message: 'Falta el ID de la mascota' });
    }

    mascotaModel.eliminarMascota(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar mascota', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada para eliminar' });
        }
        res.json({ message: 'Mascota eliminada' });
    });
};

module.exports = {
    createMascota,
    getMascotas,
    getMascotaById,
    updateMascota,
    deleteMascota,
};