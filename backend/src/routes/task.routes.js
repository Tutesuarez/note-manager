import { Router } from "express";
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/task.controller.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";


const taskRouter = Router()


// Agregar middleware jwt para verificar que usuario este logueado

taskRouter.get('/getalltask', jwtValidation, getAllTasks)
taskRouter.get('/gettaskbyid/:tid', jwtValidation, getTask)
taskRouter.post('/create-task', jwtValidation, createTask)
taskRouter.delete('/deletetaskbyid/:tid',jwtValidation, deleteTask)
taskRouter.put('/updatetask/:tid',jwtValidation, updateTask)

export default taskRouter