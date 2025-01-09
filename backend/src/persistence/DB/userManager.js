import {userModel} from "../models/user.model.js"

export default class userManager{

    async findOneByEmail(email) {
        try {
            const user = await userModel.findOne({ email })
            return user
        } catch (error) {
            return error
        }
    }
    async createOne(obj) {
        try {
            const newUser = await userModel.create(obj)
            return newUser
        } catch (error) {
            return error
        }
    }
}