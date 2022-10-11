//IMPORTACION DEL MODELO DE USUARIO 
const modelUser = require('../models/user.model');
const bcrypt = require('bcrypt');


//CONTROLADOR DE USUARIO
const CtrlUser = {};


//GET, TODOS LOS USUARIOS ACTIVOS
CtrlUser.getUsers = async (req, res) => {
    try {
        const Users = await modelUser.find({isActive: true});
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

        if (User) {
            return res.json({
                message: 'Usuario encontrado',
                User
            });
        }error

    } catch(error) {
        return res.status(404).json({message: 'No se encontro el usuario'})  
    }
}


//POST, CREAR USUARIO
CtrlUser.postUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;

        if (username.length < 6 && password.length < 8) {
            return res.status(400).json({message:"El usuario o la contraseña no cumplen el requisito minimo"
            })
        }

        //ENCRIPTADO
        const newPassword = bcrypt.hashSync(password, 10);

        const newUser = new modelUser({
            username,
            password: newPassword,
            email
        });

        await newUser.save();
        return res.status(200).json({message: 'Usuario guardado correctamente'});

    } catch (error) {
        return res.status(404).json({message: 'No se logró guardar el usuario'})
    }
}

//UPDATE, ACTUALIZAR USUARIO
CtrlUser.putUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const {password, email} = req.body;

        if (!idUser || !password || !email) {
            return res.status(400).json({
                message: 'Falta completar campos',
                respuesta: ["password", "email"]
        });
        }

        if (password.length <8) {
            return res.status(400).json({message: 'La contraseña debe ser mayor o igual a 8 caracteres'});
        }

        const User = await modelUser.findOne({$and:[{_id: idUser}, {isActive: true}]});

        if (User) {
            const newPassword = bcrypt.hashSync(password,10);
            await User.updateOne({password:newPassword, email});
            return res.status(200).json({message: 'Usuario actualizado correctamente'});
        } else {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

} catch (error) {
    return res.status(500).json({message: 'Error al actualizar usuario'});
    }
}


//DELETE, ELIMINAR USUARIO
CtrlUser.deleteUser = async (req, res) => {
    try {

        const idUser = req.params.idUser;
        const user = await modelUser.findOne({$and:[{_id: idUser},{isActive: true}]});

        if (!user){
            return res.status(404).json({message: 'El usuario ya no existe'});
        }
        await user.updateOne({isActive: false})
        return res.status(200).json({message: 'Usuario eliminado correctamente'});

} catch (error) {
    return res.status(500).json({message: 'Error interno del servidor'});
    }
}


module.exports = CtrlUser;
