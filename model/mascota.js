const db = require('../config/db');

// crear mascota
const crearMascota = (nombre, apodo, edad, foto, callback) => {
    const sql = 'INSERT INTO mascotas (nombre, apodo, edad, foto) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apodo, edad, foto], (err, result) => {
        if (err) {
            console.error('Error al insertar persona:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// obtener mascotas
const obtenerMascotas = (callback) => {
    const sql = 'SELECT * FROM mascotas';
    db.query(sql, (err, result) => {    
        if (err) {
            console.error('Error al obtener mascotas:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// obtener mascota por id
const obtenerMascotaPorId = (id, callback) => {
    const sql = 'SELECT * FROM mascotas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener mascota por id:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// actualizar mascota
const actualizarMascota = (id, nombre, apodo, edad, foto, callback) => {
    const sql = 'UPDATE mascotas SET nombre=?, apodo=?, edad=?, foto=? WHERE id=?';
    db.query(sql, [nombre, apodo, edad, foto, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar mascota:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// eliminar mascota
const eliminarMascota = (id, callback) => {
    const sql = 'DELETE FROM mascotas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar mascota:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    actualizarMascota,
    eliminarMascota,
};