import { createHash } from "../utils/bcrypt.js"
import { createOne, findOneByEmail } from "../services/auth.services.js";
import {generateToken} from '../utils/tokengenerator.js'

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

    const newUser = {
        username,
        email,
        password: createHash(password),
    };

    const user = await createOne(newUser);

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
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

        if (!isValidPassword(user, password)) {
            console.log("Invalid credentials");
            return res.status(401).send({
                status: "error",
                error: "User or Password are wrong",
                redirectURL: "/errorlogin",
            });
        }

        delete user.password;
        // req.session.user = user
        console.log("usurio en login backend", user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { registerUser, loginUser };
