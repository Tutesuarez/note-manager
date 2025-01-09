import mongoose from "mongoose"
import config from './config.js'

const URI = config.URL
export const connectDB = async()=>{
    try {
        await mongoose.connect(URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
            .then(()=>{console.log(`MongoDB is Connected!! :) => ${conn.connection.host}`)})
      } catch (error) {
        console.log(error)
        process.exit(1)  // stop the server
      }
}
