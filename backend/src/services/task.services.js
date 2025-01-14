import taskManager from "../persistence/DB/taskManager.js";

const taskmanager = new taskManager()

export const findAll = async(user)=>{
    try {
        return await taskmanager.findAll(user)
    } catch (error) {
        return error
    }
}

export const findByid = async(id)=>{
    try {
        return await taskmanager.findOneById(id)        
    } catch (error) {
        return error
    }
}

export const create = async(task)=>{
    try {
        return await taskmanager.createOne(task)
    } catch (error) {
        return error
    }
}

export const deleteone = async(id)=>{
    try {
        return await taskmanager.deleteOne(id)
        } catch (error) {
            return error
            }
}

export const updateone = async(id, obj)=>{
    try {
        return await taskmanager.updateOne(id, obj)
    } catch (error) {
        return error
    }
}