//IMPORTACION DE LOS MODELOS USUARIO Y TAREA
const modelTask = require('../models/task.model');
const modelUser = require('../models/user.model');

const CtrlTask = {}
//GET, TODAS LAS TAREAS
CtrlTask.getTask = async (req, res) => {
    try {
        const tasks = await modelTask.find({isActive: true})
        .populate('idUser', ['username', 'email']);
        
        return res.json({
            message:`Tareas encontradas:${tasks.length}`,
            tasks
        })


    } catch (error) {
        return res.status(400).json({
            message:"No se encontraron tareas"
        });
    }
}


//GET, UNA TAREA POR ID
CtrlTask.getTaskIDUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const tasks = await modelTask.find({idUser})
        .populate('idUser', ['username', 'email'])

        if (!tasks.length){
            return res.status(404).json({
                message: "No se encontraron tareas con ese usuario"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "No se encontraron tareas",
            errorBody: error.message
        });
    }
}


//POST, CREAR UNA TAREA
CtrlTask.postTask = async (req, res) => {
    try {
        const idUser = req.user._id
        const {title, description} = req.body;

        if (!idUser || !title || !description) {
            return res.status(400).json({
                message: "Informacion incompleta o inadecuada",
                opcionesObligatorias: ["idUser", "title", "description"],
            });
        }

        const User = await modelUser.findOne({_id:idUser});

        //COMPROBACION DE EXISTENCIA DE USUARIO
        if (!User) {
            return res.status(400).json({
                message: "Usuario no encontrado para asignar a la tarea"
            });
        }

        //COMPROBACION DE ADMIN
        if (!((idUser == req.user._id) || req.user.role === 'admin')) {
            return res.status(400).json({
                message: "Usuario no autorizado para asignar a la tarea"
            })
        }

        //NUEVA TAREA
        const newTask = new modelTask({
            title,
            description,
            isComplete,
            idUser,
        });

        //GUARDAR TAREA
        const tareaRegistrada = await newTask.save();
        return res.status(200).json({
            message: 'Tarea registrada exitosamente',
            tareaRegistrada
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la tarea",
            errorBody: error.message
        });
    }
}


//PUT, ACTUALIZAR TAREA
CtrlTask.putTask = async (req, res) => {
    try {

        const idTask = req.params.idTask;
        const userID = req.user._id;
        const {title, description} = req.body;

        if (!idTask || !title || !description) {
            return res.status(400).json({
                message: "ID o informacion requerida no recibida ",
                opcionesObligatorias: ["title", "description"],
            });
        }

        const Task = await modelTask.findById(idTask);
        if (!Task || !Task.isActive) {
            return res.status(400).json({
                message: "Tarea no encontradas"
            })
        }

        const userIdString = userID.toString();
        const tareaIdString = Task.idUser.toString();

        if ((userIdString === tareaIdString) || req.user.rol === 'admin') {
            await Task.updateOne({title, description});
            return res.status(200).json({
                message: 'Tarea actualizada exitosamente'
            })
        }

        return res.status(400).json({
            message: 'Usuario sin permisos de administrador'
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor al actualizar la tarea",
            errorBody: error.message
        });
    }
};


//DELETE, ELIMINAR UNA TAREA    
CtrlTask.deleteTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const userID = req.user._id;

        const Task = await modelTask.findOne({$and:[{_id:idTask},{isActive:true}]})

        if(!Task || !Task.isActive){
            return res.status(404).json({
                message: 'La tarea no existe'
            });
        }
        const userIDString = userID.toString() 
        const tareaIDString = Task.idUser.toString()

        if(!((userIDString === tareaIDString)|| req.user.role === 'admin')) {
            return res.status(401).json({
                message: 'Usuario sin permisos para eliminar la tarea'
            })
        }

        await Task.updateOne({isActive:false});
        return res.status(201).json({
            message: 'Tarea eliminada exitosamente',
        })

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error al eliminar la tarea",
            error: error.message
        })
    }
}

module.exports =CtrlTask;



