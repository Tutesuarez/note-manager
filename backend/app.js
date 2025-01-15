import express from 'express'
import session from 'express-session'
import cookieParser from "cookie-parser"
import cors from 'cors'
import config from './src/config/config.js'
import { connectDB } from './src/config/db.config.js'
import MongoStore from 'connect-mongo'
import authRouter from './src/routes/auth.routes.js'
import taskRouter from './src/routes/task.routes.js'


const PORT = config.port || 3000
const sessions =  config.session_secret
const URLDB = config.URL
const cookieF = config.COOKIE_S
const PORTF = config.pfront || 5173

// start  app
const app = express()

// conexion a base de datos
connectDB()


// middlewares
// app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(cookieF))

// Middleware CORS optimizado
const allowedOrigins = [`${PORTF}`];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST','PUT' , 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(session({
    store: MongoStore.create({
              mongoUrl: URLDB,
              mongoOpcions:{useNewUrlParser:true, useUnifiedTopology:true},
              ttl:36000 // segundos
            }),
    secret: sessions,
    resave: false,
    saveUninitialized: true,
    }))


//routes
app.use('/api/user', authRouter)
app.use('/api/tasks', taskRouter)

// start server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})