import jwt from 'jsonwebtoken'
import config from "../config/config.js"

const jwt_code = config.secret_jwt

export const generateToken = (user)=>{    
    const payload = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }}
    const token = jwt.sign(payload,jwt_code , {expiresIn:'1d' })
    console.log(token);
    return token
}


// verificacion de token
export const verifyToken = (req, res) => {
    const token  = req.cookies.tokenBE;
    
    if (!token) return res.send(false);
    
    try { 
      const isValidToken = jwt.verify(token, jwt_code)
      
      req.user = isValidToken.user
      console.log('user en verify', req.user);
      
      return res.json( req.user)
  } catch (error) {
      res.status(401).json({ message: 'token error' })
  }

    
}