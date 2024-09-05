const express = require('express');
const router = express.Router(); // Crear una instancia de Router
const db = require('../config/db'); // Importa tu configuración de base de datos
const morgan = require('morgan');


// Ruta para obtener todos los posts
router.get('/posts', (req, res) => {
  const q = "SELECT * FROM posts"; 
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error al obtener posts:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json(data);
  });
});

// Ruta para obtener un post por su ID
router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const q = "SELECT * FROM posts WHERE id = ?"; 
  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Error al obtener el post:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.json(data[0]);
  });
});

// Ruta para crear un nuevo post
router.post('/posts/create', morgan('dev'), (req, res) => {
  const { título, contenido, featured_image } = req.body; // Ajustar nombres a los definidos en el esquema
  const q = "INSERT INTO posts (título, contenido, featured_image) VALUES (?, ?, ?)";
  db.query(q, [título, contenido, featured_image], (err, data) => {
    if (err) {
      console.error("Error al crear el post:", err);
      return res.status(500).json({ message: "Error al crear el post" });
    }
    return res.status(201).json({ message: "Post creado con éxito" });
  });
});

// Ruta para actualizar un post existente
router.put('/posts/update/:id', morgan('dev'), (req, res) => {
  const postId = req.params.id;
  const { título, contenido, featured_image } = req.body; // Ajusta los campos según el esquema
  const q = "UPDATE posts SET título = ?, contenido = ?, featured_image = ? WHERE id = ?";
  db.query(q, [título, contenido, featured_image, postId], (err, data) => {
    if (err) {
      console.error("Error al actualizar el post:", err);
      return res.status(500).json({ message: "Error al actualizar el post" });
    }
    return res.json({ message: "Post actualizado con éxito" });
  });
});

// Ruta para eliminar un post existente
router.delete('/posts/delete/:id', morgan('dev'), (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE id = ?";
  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Error al eliminar el post:", err);
      return res.status(500).json({ message: "Error al eliminar el post" });
    }
    return res.json({ message: "Post eliminado con éxito" });
  });
});

// Ruta para eliminar un post basado en la imagen destacada
router.delete('/posts/delete-image/:featured_image', (req, res) => {
  const { featured_image } = req.params;
  const q = "DELETE FROM posts WHERE featured_image = ?";
  db.query(q, [featured_image], (err, data) => {
    if (err) {
      console.error("Error al eliminar la imagen destacada:", err);
      return res.status(500).json({ message: "Error al eliminar la imagen destacada" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró ningún post con la imagen proporcionada" });
    }
    return res.json({ message: "Imagen destacada eliminada con éxito" });
  });
});

module.exports = router;