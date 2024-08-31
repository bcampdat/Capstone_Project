const express = require('express');
const router = express.Router(); // Crear una instancia de Router
const db = require('../config/db'); // Importa tu configuración de base de datos

// Ruta para obtener todos los eventos
router.get('/events', (req, res) => {
  const q = "SELECT * FROM eventos"; // Suponiendo que tu tabla de eventos se llama 'eventos'
  db.query(q, (err, data) => {
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
  const q = "SELECT * FROM eventos WHERE evento_id = ?"; // Ajusta según el esquema de tu base de datos
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
router.post('/events/create', (req, res) => {
  const { title, description, date, location } = req.body; // Ajusta los campos según tu modelo de datos
  const q = "INSERT INTO eventos (titulo, descripcion, fecha, ubicacion) VALUES (?, ?, ?, ?)"; // Ajusta según el esquema de tu base de datos
  db.query(q, [title, description, date, location], (err, data) => {
    if (err) {
      console.error("Error al crear el evento:", err);
      return res.status(500).json({ message: "Error al crear el evento" });
    }
    return res.status(201).json({ message: "Evento creado con éxito" });
  });
});

// Ruta para actualizar un evento existente
router.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { title, description, date, location } = req.body; // Ajusta los campos según tu modelo de datos
  const q = "UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, ubicacion = ? WHERE evento_id = ?"; // Ajusta según el esquema de tu base de datos
  db.query(q, [title, description, date, location, eventId], (err, data) => {
    if (err) {
      console.error("Error al actualizar el evento:", err);
      return res.status(500).json({ message: "Error al actualizar el evento" });
    }
    return res.json({ message: "Evento actualizado con éxito" });
  });
});

// Ruta para eliminar un evento existente
router.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const q = "DELETE FROM eventos WHERE evento_id = ?"; // Ajusta según el esquema de tu base de datos
  db.query(q, [eventId], (err, data) => {
    if (err) {
      console.error("Error al eliminar el evento:", err);
      return res.status(500).json({ message: "Error al eliminar el evento" });
    }
    return res.json({ message: "Evento eliminado con éxito" });
  });
});

module.exports = router; // Exportar el router para su uso en otros archivos
