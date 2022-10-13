//IMPORTACION DE VALIDADOR Y DEPENDENCIA
const router = require('express').Router();
const validateJWT = require('../middlewares/validator-jwt');

const {
    getTask,
    getTaskIDUser,
    postTask,
    putTask,
    completeTask,
    deleteTask
} = require('../controllers/task.controller');

//RUTA DE OBTENER TAREAS
router.get('/task',getTask);

//RUTA DE OBTENER UNA TAREA POR ID
router.get('/task/mytasks',[validateJWT],getTaskIDUser);

//RUTA DE CREAR TAREA
router.post('/task',[validateJWT],postTask);

//RUTA DE ACTUALIZAR TAREA
router.put('/task/:idTask',[validateJWT],putTask);

//RUTA DE COMPLETAR TAREA
router.put('/task/:idTask/completar',[validateJWT],completeTask);

//RUTA DE ELIMINAR TAREA
router.delete('/task/:idTask',[validateJWT],deleteTask);

//EXPORTACION DE RUTAS DE TAREAS
module.exports = router;