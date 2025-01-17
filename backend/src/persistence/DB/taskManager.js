import {taskModel} from '../models/task.model.js'

export default class taskManager{
    async createOne(task){
        try {
            const newTask = await taskModel.create(task)
            return newTask
        } catch (error) {
            return error
        }
    }
    
    async findAll(userId){
        
        try {
            const tasksFound = await taskModel.find({ user: userId }).populate('user');
            return tasksFound
        } catch (error) {
            return error
        }
    }
    async findOneById(id){
        try {
            const taskFound = await taskModel.findById({_id:id}).populate('user')
            return taskFound
        } catch (error) {
            
        }
    }

    async updateOne(id, obj){
        
        try {
            await taskModel.findByIdAndUpdate({_id:id}, {$set: obj})
            const taskUpdated =  await taskModel.findById({_id:id}).populate('user')           
            return taskUpdated
        } catch (error) {
            
        }
    }

    async deleteOne(id){
        try {
            const taskDeleted = await taskModel.findByIdAndDelete({_id: id})
            return taskDeleted
            } catch (error) {
                return error
                }
    }


}