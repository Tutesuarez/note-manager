import express from 'express'
import cors from 'cors'
import config from './src/config/config.js'
import { connectDB } from './src/config/db.config.js'
import authRouter from './src/routes/auth.routes.js'
import taskRouter from './src/routes/task.routes.js'


const PORT = config.port || 3000

// start  app
const app = express()

// conexion a base de datos
connectDB()


// middlewares
app.use(cors())
app.use(express.json()) // for parsing application/json

//routes
app.use('/api/user', authRouter)
app.use('/api/tasks', taskRouter)

app.get('/',(req, res)=>{
    res.send('Api works correctly')
})


// start server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})