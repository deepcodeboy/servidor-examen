const jwt = require('jsonwebtoken');
//GENERADOR DEL JWT
const generateJWT = (userID) => {
    return new Promise((resolve, reject) =>{

        jwt.sign({userID}, process.env.FIRMADMIN,{
            expiresIn: '5h'
        }, (err, token) => {
            if(err){
                reject(`No se pudo generar el token: ${err.message}`);
            }
            resolve(token)
        })
        
    })
}

module.exports = generateJWT;