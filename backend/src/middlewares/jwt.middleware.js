import jwt from 'jsonwebtoken'
import config from '../config/config.js'




export const jwtValidation = (req, res, next) => {
    const token = req.cookies.tokenBE
    console.log('token en jwt validation', token);
    
    try { 
        const isValidToken = jwt.verify(token, config.secret_jwt)
        req.user = isValidToken.user
        // req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'authorization error' })
    }
}