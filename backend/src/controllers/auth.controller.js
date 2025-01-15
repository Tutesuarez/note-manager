import { createHash } from "../utils/bcrypt.js"
import { createOne, findOneByEmail } from "../services/auth.services.js";
import {generateToken} from '../utils/tokengenerator.js';
import { isValidPassword } from "../utils/bcrypt.js";

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await findOneByEmail(email);
    if (userExists) {
      return res.status(400).json({ 
        status: "error",
        error: "User already exists",
        message: "User already exists"});
    }
 console.log(' antes de hashear');
 
    const newUser = {
        username,
        email,
        password: createHash(password),
    };

    console.log(newUser);
    
    const user = await createOne(newUser);

    if (user) {
      const token = generateToken({ id: user._id });
        res.cookie("tokenBE", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
           .send({ status: "success", redirectURL: "/task" });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

    if (!email || !password) {
        console.log("Incomplete values");
        return res.json({ redirectURL: "/errorlogin" });
    }
    try {
        const user = await findOneByEmail(email);
        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(401).send({
                status: "error",
                error: "User not found",
                redirectURL: "/errorlogin",
            });
        }


        const isValid = isValidPassword(user,password)
        
        if (!isValid) {
            console.log("Invalid credentials");
            return res.status(401).send({
                status: "error",
                error: "User or Password are wrong",
                redirectURL: "/errorlogin",
            });
        }

        delete user.password;
        req.session.user = user
        console.log("usurio en login backend", user);
        const token = generateToken(user);
        res.cookie("tokenBE", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        res.status(200).json({ status: "success", message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const logout = async(req, res)=>{
  res.clearCookie('tokenBE'); // Limpiar la cookie del token
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
}

export { registerUser, loginUser, logout };
