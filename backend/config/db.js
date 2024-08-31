const mysql = require("mysql");

require("dotenv").config();

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit(1); // Sale del proceso si hay un error de conexión
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});


module.exports = db;