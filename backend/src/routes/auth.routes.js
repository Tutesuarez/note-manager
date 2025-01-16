import { Router } from "express"
import { loginUser, registerUser,logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/tokengenerator.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const authRouter = Router()


authRouter.post('/register',registerUser) 
authRouter.post('/login', loginUser)
authRouter.post('/logout', logout)
authRouter.get('/verify', verifyToken)

export default authRouter