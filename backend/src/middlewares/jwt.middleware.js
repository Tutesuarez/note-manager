import jwt from 'jsonwebtoken'
import config from '../config/config.js'




export const jwtValidation = (req, res, next) => {
    const token = req.cookies.tokenBE 
    if (!token) return res.status(401).json({ message: 'No token provided' });   
    try { 
        console.log('Token:', token)
        const isValidToken = jwt.verify(token, config.secret_jwt)
        console.log('Token decode:', isValidToken.user)
        const user = isValidToken.user
        console.log('user en jwt;: ', user);
        
        req.user = user
        
        next()
    } catch (error) {
        res.status(401).json({ message: 'authorization error' })
    }
}