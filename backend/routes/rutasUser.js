const express = require('express');
const router = express.Router(); // Aseguramos la declaración de router
const db = require('../config/db');
const bcrypt = require('bcrypt');

const {
  encryptPassword,
  comparePasswords,
  generateToken,
} = require("../middlewares/bcrypt");

// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
  const q = "SELECT * FROM usuarios";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    return res.json(data);
  });
}); //http://localhost:3001/api/users

// Ruta para crear un usuario
router.post("/users/create", async (req, res) => {
  const { username, email, password, image } = req.body; // Obtenemos los datos del cuerpo de la solicitud

  try {
    // Encriptar la contraseña usando bcrypt
    const hashedPassword = await encryptPassword(password);

    // Consulta SQL para insertar un nuevo usuario con la contraseña encriptada
    const q = "INSERT INTO usuarios (user_email, user_name, password, foto_users) VALUES (?, ?, ?, ?)";
    db.query(q, [email, username, hashedPassword, image], (err, data) => {
      if (err) {
        console.error("Error al crear usuario:", err);
        return res.status(500).json({ message: "Error al crear usuario" });
      } else {
        return res.status(201).json({ message: "Usuario creado con éxito" });
      }
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para login de usuario
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body; // Obtenemos los datos del cuerpo de la solicitud

  try {
    // Consulta SQL para buscar al usuario por su nombre de usuario
    const q = "SELECT * FROM usuarios WHERE user_name = ?";
    db.query(q, [username], async (err, data) => {
      if (err) {
        console.error("Error al buscar usuario:", err);
        return res.status(500).json({ message: "Error del servidor" });
      }

      if (data.length === 0) {
        // No se encontró el usuario
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      const user = data[0];

      // Comparar la contraseña ingresada con la contraseña encriptada almacenada
      const isValidPassword = await comparePasswords(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // Generar un token JWT para el usuario autenticado
      const token = generateToken(user);

      // Responder con el token y los datos del usuario
      res.json({ message: "Inicio de sesión exitoso", token, user });
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para actualizar usuario (a completar)
router.put('/users', (req, res) => {
  // Lógica para actualizar un usuario
  res.send('Actualizar usuario!');
});

// Ruta para eliminar usuario (a completar)
router.delete('/users', (req, res) => {
  // Lógica para eliminar un usuario
  res.send('Eliminar usuario!');
});

module.exports = router;
