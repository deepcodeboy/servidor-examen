//IMPORTACION DEL MODELO DE USUARIO
const User = require('../models/user.model');

//IMPORTACION DE DEPENDENCIAS 
const generarJWT = require('../helper/generador-jwt');
const bcrypt = require('bcrypt');
const CtrlAuth = {};

CtrlAuth.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const USER = await User.findOne({username});

        //VERIFICAR USUARIO
        if (!USER) {
            return res.status(400).json({
                    ok:false,
                    message:"Usuario no encontrado"
            });
        };

        //VERIFICAR USUARIO ACTIVO
        if(!USER.isActive) {
            return res.status(400).json({
                    ok:false,
                    message:"Usuario inactivo"
            });
        };
        
        //VALIDAR PASSWORD
        const validPassword = bcrypt.compareSync(password, USER.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                message:"Error al comprobar - Contraseña Incorrecta"
            });
        };

        //GENERAR JWT
        const token = await generarJWT(USER._id);
        return res.json({token});
        
    } catch (error) {
        return res.status(500).json({message:'Error al iniciar sesión',error: error.message || error });
    } //FALLO AL CREAR TOKEN
}

module.exports = CtrlAuth;