const personaModel = require('../model/persona');

// Crear una nueva persona
const createPersona = (req, res) => {
    const { nombre, apellido, correo } = req.body;

    // Validación simple
    if (!nombre || !apellido || !correo) {
        return res.status(400).json({ message: 'Faltan campos requeridos: nombre, apellido, correo' });
    }

    // Llamar al modelo para crear la persona
    personaModel.crearPersona(nombre, apellido, correo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear persona', error: err });
        }
        res.status(201).json({ message: 'Persona creada', id: result.insertId });
    });
};

// Obtener todas las personas
const getPersonas = (req, res) => {
    personaModel.obtenerPersonas((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener personas', error: err });
        }
        res.json(result);
    });
};

// Obtener una persona por ID
const getPersonaById = (req, res) => {
    const { id } = req.params;

    personaModel.obtenerPersonaPorID(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener persona', error: err });
        }
        if (!result.length) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.json(result[0]);
    });
};

// Actualizar una persona
const updatePersona = (req, res) => {
    const { nombre, apellido, correo } = req.body;
    const id = req.params.id;

    // Validación simple
    if (!nombre || !apellido || !correo) {
        return res.status(400).json({ message: 'Faltan campos requeridos: nombre, apellido, correo' });
    }

    personaModel.actualizarPersona(id, nombre, apellido, correo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar persona', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Persona no encontrada para actualizar' });
        }
        res.json({ message: 'Persona actualizada' });
    });
};

// Eliminar una persona
const deletePersona = (req, res) => {
    const id = req.params.id;

    personaModel.eliminarPersona(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar persona', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Persona no encontrada para eliminar' });
        }
        res.json({ message: 'Persona eliminada' });
    });
};

module.exports = {
    createPersona,
    getPersonas,
    getPersonaById,
    updatePersona,
    deletePersona,
}