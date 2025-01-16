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
 try {
    const newUser = await UserManager.createOne(obj)
    
    return newUser
 } catch (error) {
    return error
 }
}

export const setLastConnection = async (uid) => { 
    try { 
        const setConnection = await UserManager.setLastConnection(uid) 
        return setConnection 
    } catch (error) { 
        return error 
    } 
}



