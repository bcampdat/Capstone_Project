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
  const q = "SELECT * FROM posts WHERE post_id = ?"; // Ajusta según el esquema de tu base de datos
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
router.post('/posts/create', morgan('dev') , (req, res) => {
  const { title, content, featured_image } = req.body; // Ajusta los campos según tu modelo de datos
  const q = "INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)"; // Ajusta según el esquema de tu base de datos
  db.query(q, [title, content, featured_image], (err, data) => {
    if (err) {
      console.error("Error al crear el post:", err);
      return res.status(500).json({ message: "Error al crear el post" });
    }
    return res.status(201).json({ message: "Post creado con éxito" });
  });
});

// Ruta para actualizar un post existente
router.put('/posts/:id', morgan ('dev'), (req, res) => {
  const postId = req.params.id;
  const { title, content, featured_image} = req.body; 
  const q = "UPDATE posts SET title = ?, content = ? WHERE post_id = ?"; 
  db.query(q, [title, content,featured_image, postId], (err, data) => {
    if (err) {
      console.error("Error al actualizar el post:", err);
      return res.status(500).json({ message: "Error al actualizar el post" });
    }
    return res.json({ message: "Post actualizado con éxito" });
  });
});

// Ruta para eliminar un post existente
router.delete('/posts/:id', morgan ('dev'), (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE post_id = ?"; // Ajusta según el esquema de tu base de datos
  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Error al eliminar el post:", err);
      return res.status(500).json({ message: "Error al eliminar el post" });
    }
    return res.json({ message: "Post eliminado con éxito" });
  });
});

module.exports = router; // Exportar el router para su uso en otros archivos
