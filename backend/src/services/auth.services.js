import userManager from "../persistence/DB/userManager.js"

const UserManager = new userManager()

export const findOneByEmail = async(email)=>{
    try {
        const user = UserManager.findOneByEmail(email)
        return user
    } catch (error) {
        return error
    }
}

export const createOne = async(obj)=>{
    console.log('objeto en services', obj);
 try {
    const newUser = await UserManager.createOne(obj)
    
    return newUser
 } catch (error) {
    return error
 }
}


module.exports = { registerUser, loginUser };
