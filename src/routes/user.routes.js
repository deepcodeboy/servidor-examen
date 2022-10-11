const router = require('express').Router();

const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
} = require('../controllers/user.controller');

//OBTENER USUARIOS
router.get('/users', getUsers);

//OBTENER UN USUARIO
router.get('/user/:idUser', getUserID);

//CREAR UN USUARIO
router.post('/user', postUser);

//ACTUALIZAR UN USUARIO
router.put('/user/:idUser', putUser);

//ELIMINAR UN USUARIO
router.delete('/user/:idUser', deleteUser);

module.exports = router;