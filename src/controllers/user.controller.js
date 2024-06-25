import User from "../persistence/models/user.model.js"

const createUser = async(req,res)=>{
    const {username, email, password}=req.body

    const newUser = new User({
        username,
        email,
        password
    })

    const user = await userModel.create({username, email, password})
    res.status(201).json(user)
}

const userSession = async(req,res)=>{
    //sesion de usuario
    console.log('login');
}


export {
    createUser,
    userSession
}
