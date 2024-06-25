import { Router } from "express"
import { createUser, userSession } from "../controllers/user.controller.js"


const userRouter = Router()


userRouter.get('/register', createUser)
userRouter.post('/login', userSession)



export default userRouter