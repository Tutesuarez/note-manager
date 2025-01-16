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

    async setLastConnection(uid) {
        try {
            let result = await userModel.updateOne(
                { _id: uid },
                { $set: { last_connection: new Date().toISOString() } }
            );
            return result
        } catch (error) {
            return { error: error.message }
        }
    }
}