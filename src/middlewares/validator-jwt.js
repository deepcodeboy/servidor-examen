//IMPORTACION DE MODELO DE USUARIO Y LIBRERIA
const modelUser = require('../models/user.model');
const jwt = require('jsonwebtoken');

//VALIDAR TOKEN
const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    //VERIFICAR TOKEN
    if(!token){
        return res.status(401).json({
            msg: 'Error no existe token en la petición'
        })
    };

    try {
        const {userID} = await jwt.verify(token, process.env.FIRMADMIN);
        const Usuario = await modelUser.findById(userID);

        //VERIFICAR USUARIO
        if(!Usuario) {
            return res.status(401).json({
                error: 'Token o Usuario no existe'
            })
        };

        //VERIFICAR USUARIO ACTIVO
        if (!Usuario.isActive) {
            return res.status(401).json({
                message: 'Token no válido o usuario no activo'
            })
        };
        req.user = Usuario;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json(
            {
                msg: ' Error de autenticación - Token no válido'
            }
        )
    }
}

module.exports = validarJWT