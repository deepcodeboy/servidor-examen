//ROL DE ADMINISTRADOR
const isAdmin = (req, res, next) => {
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'No autorizado - No eres administrador'
        })
    }

    next();
}

module.exports = isAdmin;