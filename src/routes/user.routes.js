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

//OBTENER USUARIOS
router.get('/users',[validateJWT,isAdmin], getUsers);

//OBTENER UN USUARIO
router.get('/user/:idUser',[validateJWT], getUserID);

//CREAR UN USUARIO
router.post('/user', postUser);

//ACTUALIZAR UN USUARIO
router.put('/user/:idUser',[validateJWT], putUser);

//ELIMINAR UN USUARIO
router.delete('/user/:idUser',[validateJWT], deleteUser);

module.exports = router;