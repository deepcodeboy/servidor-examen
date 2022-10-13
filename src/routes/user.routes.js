//IMPORTACION DE MIDDLEWARES Y DEPENDENCIAS
const router = require('express').Router();
const validateJWT = require('../middlewares/validator-jwt')
const isAdmin = require('../middlewares/admin')

const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
} = require('../controllers/user.controller');

//RUTA DE OBTENER USUARIOS
router.get('/users',[validateJWT,isAdmin], getUsers);

//RUTA DE OBTENER UN USUARIO
router.get('/user/:idUser',[validateJWT], getUserID);

//RUTA CREAR UN USUARIO
router.post('/user', postUser);

//RUTA DE ACTUALIZAR UN USUARIO
router.put('/user',[validateJWT], putUser);

//RUTA DE ELIMINAR UN USUARIO
router.delete('/user',[validateJWT], deleteUser);

//EXPORTACION DE RUTAS DE USUARIO
module.exports = router;