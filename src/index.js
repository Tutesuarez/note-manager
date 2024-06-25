import app from './app.js'
import config from './config/config.js'
import {connectDB} from './config/db.config.js'


const PORT = config.port

connectDB()


app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})