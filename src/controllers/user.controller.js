//IMPORTACION DEL MODELO DE USUARIO 
const modelUser = require('../models/user.model');
const bcrypt = require('bcrypt');


//CONTROLADOR DE USUARIO
const CtrlUser = {};


//GET, TODOS LOS USUARIOS ACTIVOS
CtrlUser.getUsers = async (req, res) => {
    try {
        const Users = await modelUser.find({isActive: true});

        //OBTENER USUARIOS
        return res.json({
            message: `Usuarios encontrados ${Users.length}`,
            Users
        })

    } catch (error) {
        return res.status(404).json({message: 'No se encontraron los usuarios', error:error.message}) 
    } 
}


//GET, UN USUARIO POR ID
CtrlUser.getUserID = async (req, res) => {
    try {
        const UserID = req.params.idUser;
        const User = await modelUser.findOne({$and: [{"_id":UserID},{isActive:true}]});
        
        //VERIFICAR USUARIO
        if (!User) {
           return res.status(404).json({
               message: 'Usuario no encontrado',
           });
       }

       //VERIFICACION PERMISOS
        if (!(UserID == req.user._id || req.user.rol === 'admin')) {
            return res.status(401).json({
                message: 'Usuario sin derechos de administrador'
            })
        }

        //OBTENER USUARIO
        return res.json({
            message: 'Usuario encontrado',
            User
       });

    } catch(error) {
        return res.status(500).json({
            message: 'Error interno del servidor al encontrar usuario',
            error: error.message
        })  
    }
}


//POST, CREAR USUARIO
CtrlUser.postUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;

        //VERIFICACION REQUISITOS
        if (username.length < 6 && password.length < 8) {
            return res.status(400).json({
                message:"El usuario o la contraseña no cumplen el requisito minimo"
            })
        }

        //ENCRIPTADO
        const newPassword = bcrypt.hashSync(password, 10);

        //USUARIO NUEVO
        const newUser = new modelUser({
            username,
            password: newPassword,
            email
        });

        //GUARDADO
        await newUser.save();
        return res.status(200).json({message: 'Usuario guardado correctamente'});

    } catch (error) {
        return res.status(404).json({message: 'No se logró guardar el usuario'})
    }
}

//UPDATE, ACTUALIZAR USUARIO
CtrlUser.putUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const {password, email} = req.body;

        //VERIFICACION DE CAMPOS
        if (!idUser || !password || !email) {
            return res.status(400).json({
                message: 'Falta completar campos',
                respuesta: ["password", "email"]
        });
        }

        //VERIFICAR RANGO DE CONTRASEÑA
        if (password.length <8) {
            return res.status(400).json({
                message: 'La contraseña debe ser mayor o igual a 8 caracteres'});
        }

        const User = await modelUser.findOne({$and:[{_id: idUser}, {isActive: true}]});

        //VERIFICAR USUARIO
        if (!User) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const newPassword = bcrypt.hashSync(password,10);

        //ACTUALIZAR
        await User.updateOne({password:newPassword, email});
        return res.status(200).json({message: 'Usuario actualizado correctamente'});

} catch (error) {
    return res.status(500).json({message: 'Error al actualizar usuario'});
    }
}


//DELETE, ELIMINAR USUARIO
CtrlUser.deleteUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const user = await modelUser.findOne({$and:[{_id: idUser},{isActive: true}]});

        //VERIFICAR USUARIO
        if (!user){
            return res.status(404).json({message: 'El usuario ya no existe'});
        }

        //ELIMINAR USUARIO
        await user.updateOne({isActive: false})
        return res.status(200).json({message: 'Usuario eliminado correctamente'});

} catch (error) {
    return res.status(500).json({message: 'Error interno del servidor'});
    }
}


module.exports = CtrlUser;
