import mongoose from "mongoose"
import config from './config.js'




const URI = config.URL
export const connectDB = async()=>{
    try {
        await mongoose.connect(URI)
            .then(()=>{console.log('DB is Connected')})
      } catch (error) {
        console.log(error)
      }
}

