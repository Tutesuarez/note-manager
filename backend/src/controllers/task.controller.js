import { findAll, findByid, deleteone, updateone, create} from "../services/task.services.js"
import {taskModel} from "../persistence/models/task.model.js"


const getAllTasks = async(req, res)=>{
    // va dentro findall({user: req.user._id})
    try {
        const tasksFound = await findAll()
        res.status(200).json(tasksFound)
    } catch (error) {
        res.status(500).json({ message: "Error getting tasks" })
    }
}

const getTask = async(req, res)=>{
    const id = req.params.tid
    
    try {
        const task = await findByid(id)
        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: "Error getting your task" })
    }
}
const updateTask = async (req, res) => {
    const id = req.params.tid
    const objupdate = req.body
    try {
        const task = await updateone(id, objupdate)
        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json(task)
    } catch (error) {
        return error
    }
}
const deleteTask = async (req, res) => {
    const id = req.params.tid
    try {
        let taskFound = await findByid(id)
        if (taskFound) {
            await deleteone(id)
            res.send({
                status: "success",
                payload: "The task was successfully removed",
            })
        }
    } catch (error) {
        return error
    }


}
const createTask = async (req, res) => {
    const { title, description } = req.body

    if (!title || !description) {
        return res.status(400).json({ message: ' Data missing' })
    }
    // console.log(req.user._id)
    try {
        const newTask = new taskModel ({
            title: title, 
            description: description,
            // user: req.user._id
        })
        const task = await create(newTask)
        res.status(200).json({ message: 'Task created', task: task })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}