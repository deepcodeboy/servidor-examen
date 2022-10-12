const modelUser = require('../models/user.model');
const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            msg: 'Error de autenticación - no hay token en la petición'
        })
    };

    try {
        const {userID} = await jwt.verify(token, process.env.FIRMADMIN);
        const Usuario = await modelUser.findById(userID);
        if(!Usuario) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en la DB'
            })
        };
        if (!Usuario.isActive) {
            return res.status(401).json({
                message: 'Token no válido - usuario no está activo'
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