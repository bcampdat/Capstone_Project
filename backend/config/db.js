const mysql = require("mysql");

require("dotenv").config();

const URLDB = process.env.DATABASE_URL || "mysql://root:AtHEnaaCNPyvxrAkjpnMXwJZroFDWUjw@mysql.railway.internal:3306/railway";

const db = mysql.createConnection({
  user: process.env.DB_USER || "root",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "mycap_stone",
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
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