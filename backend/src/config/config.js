import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    URL: process.env.MONGO_URL,
    secret_jwt: process.env.SECRET_JWT,
}
