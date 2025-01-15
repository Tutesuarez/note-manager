import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    URL: process.env.MONGO_URL,
    secret_jwt: process.env.SECRET_JWT,
    session_secret: process.env.SESSION_SECRET,
    COOKIE_S:process.env.COOKIE_SECRET,
    pfront: process.env.PORTFRONT
}
