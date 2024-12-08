const db = require('../config/db');

// crear persona
const crearPersona = (nombre, apellido, correo, callback) => {
    const sql = 'INSERT INTO personas (nombre, apellido, correo) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellido, correo], (err, result) => {
        if (err) {
            console.error('Error al insertar persona:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// obtener personas
const obtenerPersonas = (callback) => {
    const sql = 'SELECT * FROM personas';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al obtener personas:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// actualizar persona
const actualizarPersona = (id, nombre, apellido, correo, callback) => {
    const sql = 'UPDATE personas SET nombre = ?, apellido = ?, correo = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, correo, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar persona:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// eliminar persona
const eliminarPersona = (id, callback) => {
    const sql = 'DELETE FROM personas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar persona:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// obtener persona por ID
const obtenerPersonaPorID = (id, callback) => {
    const sql = 'SELECT * FROM personas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener persona por ID:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    crearPersona,
    obtenerPersonas,
    actualizarPersona,
    eliminarPersona,
    obtenerPersonaPorID,
}