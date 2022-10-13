//IMPORTACION CONTROLADOR DE AUTH Y DEPENDENCIA
const {login} = require('../controllers/auth.controller');
const router = require('express').Router();

//RUTA GET DE LOGIN
router.get('/login', (req, res) => {
    return res.json({
        message:"Ingrese su usuario y contraseña"
    })
})

//PROCESO PARA LOGUEAR
router.post('/login',login);

//EXPORTACION DE RUTA DE LOGIN
module.exports = router;
