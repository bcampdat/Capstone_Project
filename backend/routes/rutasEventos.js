const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Ruta para obtener todos los eventos
router.get('/events', (req, res) => {
  const query = "SELECT * FROM eventos";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener eventos:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json(results);
  });
});

// Ruta para obtener un evento por su ID
router.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const query = "SELECT * FROM eventos WHERE id = ?";
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error("Error al obtener el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.json(results[0]);
  });
});

// Ruta para crear un nuevo evento
router.post('/events', (req, res) => {
  const { title, content, start, end, usuario_id } = req.body;
  const query = "INSERT INTO eventos (title, content, start, end, usuario_id) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [title, content, start, end, usuario_id], (err, results) => {
    if (err) {
      console.error("Error al crear el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.status(201).json({ message: "Evento creado con éxito", eventId: results.insertId });
  });
});

// Ruta para actualizar un evento
router.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { title, content, start, end } = req.body;
  const query = "UPDATE eventos SET title = ?, content = ?, start = ?, end = ? WHERE id = ?";
  db.query(query, [title, content, start, end, eventId], (err, results) => {
    if (err) {
      console.error("Error al actualizar el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json({ message: "Evento actualizado con éxito" });
  });
});

// Ruta para eliminar un evento
router.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const query = "DELETE FROM eventos WHERE id = ?";
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error("Error al eliminar el evento:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json({ message: "Evento eliminado con éxito" });
  });
});

module.exports = router;
