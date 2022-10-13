const router = require('express').Router();
const validateJWT = require('../middlewares/validator-jwt');

const {
    getTask,
    getTaskIDUser,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controller');

router.get('/task',getTask);

router.get('/user/task/:idUser',getTaskIDUser);

router.post('/task',[validateJWT],postTask);

router.put('/task/:idTask',[validateJWT],putTask);

router.delete('/task/:idTask',[validateJWT],deleteTask);

module.exports = router;