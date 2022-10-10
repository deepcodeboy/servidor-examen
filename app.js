//IMPORTACION DE LIBRERIAS
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config()


//CONEXION A LA BASE DE DATOS
const dbConnect = require('./src/db/connection')
dbConnect();


//INICIALIZACION DE EXPRESS
const app = express()

//CONFIGURACIONES
const port = process.env.PORT || 4000;

//MIDDLEWARES
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//RUTAS


//SERVIDOR EN ESCUCHA
app.listen(port, console.log(`Servidor iniciado en http://localhost:${port}`));