// const https = require('https');   vigilar   sino ho funciona por el token
const express = require("express");
const mysql = require("mysql2");
const db = require("./config/db");
const cors = require("cors");

const nodemon = require("nodemon");
const morgan = require("morgan");
require("dotenv").config();

const https = require("https");

// https server 
const fs = require("fs");
const path = require("path");

// Read SSL certificate and key files
const options = {
  key: fs.readFileSync(path.join(__dirname,"../seg/localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname,"../seg/localhost.pem")),
};

const app = express();

const logger = morgan("dev");
app.use(logger);

app.get("/", (req, res) => {
  res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
});


// openssl genrsa -out localhost-key.pem 2048

// openssl req -new -x509 -sha256 -key localhost-key.pem -out localhost.pem -days 365
// Create HTTPS server
const server = https.createServer(options, app);


app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // Reemplazar con el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  
}));


app.use(express.json());

// rutas  

const rutasUser = require('./routes/rutasUser'); // Importa tu archivo de rutas correctamente
const rutasPosts = require('./routes/rutasPost');
const rutasEventos = require('./routes/rutasEventos');
app.use('/api', rutasUser); 
app.use('/api', rutasPosts); // Rutas de posts
app.use('/api', rutasEventos); // Rutas de eventos


app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

// listener
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
