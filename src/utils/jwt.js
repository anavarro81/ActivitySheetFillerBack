import jwt from "jsonwebtoken"


// Genera un JSON Web Token (JWT)
// Recibe como parametros el id del usuario y su email. 

export const generateSign = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_KEY, {expiresIn: "1h"})
}

// Devuelve true o false en funcion de si el token enviado en válido o no. 
export const verifySign = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
}