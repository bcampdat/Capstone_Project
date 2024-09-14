const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const db = require('../config/db');

// Ruta para obtener todos los eventos
// Ruta para obtener todos los eventos del usuario logueado
router.get('/events', (req, res) => {
  const usuario_id = req.query.usuario_id; // Asumimos que usuario_id se envía como query param

  if (!usuario_id) {
    return res.status(400).json({ message: "Usuario no autenticado" });
  }

  const q = "SELECT * FROM eventos WHERE usuario_id = ?";
  db.query(q, [usuario_id], (err, data) => {
    if (err) {
      console.error("Error al obtener eventos:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json(data);
  });
});


// Ruta para obtener un evento por su ID
router.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const q = "SELECT * FROM eventos WHERE id_events = ?";
  db.query(q, [eventId], (err, data) => {
    if (err) {
      console.error("Error al obtener el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.json(data[0]);
  });
});

// Ruta para crear un nuevo evento
// Ruta para crear un nuevo evento
router.post('/events/create', morgan('dev'), (req, res) => {
  const { title, content, start, end, usuario_id } = req.body;

  // Validar si todos los campos obligatorios están presentes
  if (!title || !content || !start || !end || !usuario_id) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  // Consulta para insertar el evento en la base de datos
  const q = "INSERT INTO eventos (title, content, start, end, usuario_id) VALUES (?, ?, ?, ?, ?)";

  db.query(q, [title, content, start, end, usuario_id], (err, result) => {
    if (err) {
      console.error("Error al crear el evento:", err);
      return res.status(500).json({ message: "Error al crear el evento" });
    }

    // Obtener el ID del evento recién creado
    const eventId = result.insertId;

    // Responder con éxito y devolver el ID del evento
    return res.status(201).json({ message: "Evento creado con éxito", eventId });
  });
});



// Ruta para actualizar un evento
router.put('/events/update/:id', (req, res) => {
  const eventId = req.params.id;
  const { title, content, start, end, usuario_id } = req.body;

  // Verificar si el usuario es propietario del evento
  const qSelect = "SELECT * FROM eventos WHERE id_events = ? AND usuario_id = ?";
  db.query(qSelect, [eventId, usuario_id], (err, result) => {
    if (err) {
      console.error("Error al obtener el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }

    if (result.length === 0) {
      return res.status(403).json({ message: "No autorizado para actualizar este evento" });
    }

    // Actualizar el evento
    const qUpdate = "UPDATE eventos SET title = ?, content = ?, start = ?, end = ? WHERE id_events = ?";
    db.query(qUpdate, [title, content, start, end, eventId], (err) => {
      if (err) {
        console.error("Error al actualizar el evento:", err);
        return res.status(500).json({ message: "Error al actualizar el evento" });
      }
      return res.json({ message: "Evento actualizado con éxito" });
    });
  });
});


// Ruta para eliminar un evento
// Ruta para eliminar un evento
router.delete('/events/delete/:id', morgan('dev'), (req, res) => {
  const eventId = req.params.id;
  const usuario_id = req.query.usuario_id; // Obtenemos el usuario_id desde el query param

  // Verificar si el usuario es propietario del evento
  const qCheckOwnership = "SELECT * FROM eventos WHERE id_events = ? AND usuario_id = ?";
  db.query(qCheckOwnership, [eventId, usuario_id], (err, result) => {
    if (err) {
      console.error("Error al verificar el propietario del evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }

    // Si el evento no existe o no pertenece al usuario, devolver un error 403
    if (result.length === 0) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este evento" });
    }

    // Eliminar el evento si pertenece al usuario
    const qDelete = "DELETE FROM eventos WHERE id_events = ?";
    db.query(qDelete, [eventId], (err) => {
      if (err) {
        console.error("Error al eliminar el evento:", err);
        return res.status(500).json({ message: "Error al eliminar el evento" });
      }
      return res.json({ message: "Evento eliminado con éxito" });
    });
  });
});


module.exports = router;
