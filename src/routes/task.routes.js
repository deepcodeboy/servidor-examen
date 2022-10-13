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

router.get('/task',getTask);

router.get('/task/mytasks',[validateJWT],getTaskIDUser);

router.post('/task',[validateJWT],postTask);

router.put('/task/:idTask',[validateJWT],putTask);

router.put('/task/:idTask/completar',[validateJWT],completeTask);

router.delete('/task/:idTask',[validateJWT],deleteTask);

module.exports = router;