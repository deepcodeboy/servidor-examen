//IMPORTACION DE LIBRERIA
const mongoose = require("mongoose");

//CONEXION A BASE DE DATOS
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexion exitosa a la base de datos")
    } catch (error) {
        console.log(`No se conecto a la base de datos: ${error.message}`)
    }
}

module.exports = dbConnect;
