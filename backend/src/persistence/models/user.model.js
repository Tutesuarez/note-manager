import {Schema, model} from "mongoose"

const userCollection = 'User'

const userSchema =new Schema({
    username:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        index: true,
        unique: true
    },
    password:{
        type:String,
        required:true
        },
    last_conection:{
        type:String
    }
},
{
    timestamps:true
})



export const userModel = model(userCollection, userSchema)