import jwt from 'jsonwebtoken'
import config from "../config/config.js"

const jwt_code = config.secret_jwt

export const generateToken = (user)=>{    
    const payload = {
        user: {
          id: user.id,
          email: user.email,
        }}
    const token = jwt.sign(payload,jwt_code , {expiresIn:'1d' })
    console.log(token);
    return token
}


// // verificacion de token
// export const verifyToken = async (req, res) => {
//     const token  = req.cookies;
//     if (!token) return res.send(false);

//     jwt.verify(token, jwt_code, async (error, user) => {
//         if (error) return res.sendStatus(401);

//         const userFound = await findOneByEmail(user.email);
//         if (!userFound) return res.sendStatus(401);

//         return res.json({
//             id: userFound._id,
//             username: userFound.username,
//             email: userFound.email,
//         });
//     });
// }