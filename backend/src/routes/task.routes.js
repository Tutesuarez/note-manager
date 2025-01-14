import { Router } from "express";
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/task.controller.js";


const taskRouter = Router()


// Agregar middleware jwt para verificar que usuario este logueado

taskRouter.get('/getalltask', getAllTasks)
taskRouter.get('/gettaskbyid/:tid', getTask)
taskRouter.post('/create-task', createTask)
taskRouter.delete('/deletetaskbyid/:tid', deleteTask)
taskRouter.put('/updatetask/:tid', updateTask)

export default taskRouter