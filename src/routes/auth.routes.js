import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const router = Router();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No se envió token' });
    }

    // Quitar el prefijo 'Bearer ' del token
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        req.userId = decoded.userId;
        next(); // Pasar al siguiente middleware o controlador
    });
};

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.getByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe." });
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        // Crear el nuevo usuario
        const userId = await User.create({ name, email, password: hashedPassword, phone, address });

        if (!userId) throw new Error("No se pudo registrar el usuario.");

        return res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor.", error });
    }
});

router.post("/login", async (req, res,) => {
    try {
        
        console.log("Datos recibidos en /auth/login:", req.body);
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.getByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Comparar la contraseña
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Crear el token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        console.error("Error en /auth/login:", error);
        return res.status(500).json({ message: "Error en el servidor.", error });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Supón que tienes un middleware de autenticación que agrega userId al objeto req
        const userId = req.userId;

        // Obtener los datos del usuario
        const user = await User.getById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});


export default router;
