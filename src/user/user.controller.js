'use strict' 

import mongoose from "mongoose";
import User from './user.model.js'
import { generateJwt } from '../../utils/jwt.js'
import { encrypt,  } from '../../utils/validator.js';
import bcrypt from 'bcrypt';



/*Admin por default*/
export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' });
        if (!existingAdmin) {
            const hashedPassword = await encrypt ('ADMINB', 10);  // Hash de la contraseña con bcrypt
            const defaultAdmin = new User({
                name: 'Admin',
                surname: 'AdminSurname',  // Agregado el campo surname
                username: 'admin',  // Corregido username
                email: 'admin@example.com',
                phone: '12345678',
                subject: new mongoose.Types.ObjectId(),  // Sujeto temporal, debe reemplazarse con un ID válido
                password: hashedPassword,
                profilePic: '',  // Campo profilePic por defecto
                role: 'ADMIN',
                scholarship: new mongoose.Types.ObjectId()  // Beca temporal, debe reemplazarse con un ID válido
            });
            await defaultAdmin.save();
            console.log('El administrador predeterminado se ha creado exitosamente.');
        } else {
            console.log('Ya existe un administrador en la base de datos.');
        }
    } catch (error) {
        console.error('Error al crear el administrador predeterminado:', error);
    }
};


export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({ username: identifier });

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            };

            const token = await generateJwt(loggedUser);

            return res.send({ message: `Bienvenido ${loggedUser.name}`, token, role: user.role });
        }

        return res.status(401).send({ message: 'Credenciales inválidas' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error durante el inicio de sesión' });
    }
};


export const registerClient = async (req, res) => {
    try {
        const { name, surname, username, email, phone, subject, password, profilePic, scholarship } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({ message: 'El nombre de usuario o correo electrónico ya está en uso.' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = new User({
            name,
            surname,
            username,
            email,
            phone,
            password: hashedPassword, 
            profilePic: profilePic || '',  
            role: 'USER', 
            scholarship
        });

        await newUser.save();
        return res.status(201).send({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar al cliente:', error);
        return res.status(500).send({ message: 'Error al registrar al cliente.' });
    }
};


export const updateUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await User.findById(id); // Encuentra el usuario por su id

        if (!currentUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Actualiza los campos permitidos
        const { name, surname, username, email, phone, password, profilePic, role, scholarship } = req.body;

        // Actualiza los campos del usuario
        currentUser.name = name || currentUser.name;
        currentUser.surname = surname || currentUser.surname;
        currentUser.username = username || currentUser.username;
        currentUser.email = email || currentUser.email;
        currentUser.phone = phone || currentUser.phone;
        currentUser.profilePic = profilePic || currentUser.profilePic;
        currentUser.role = role || currentUser.role;
        currentUser.scholarship = scholarship || currentUser.scholarship;

        // Si se proporciona una nueva contraseña, actualízala
        if (password) {
            const salt = await bcrypt.genSalt(10);
            currentUser.password = await bcrypt.hash(password, salt);
        }

        await currentUser.save();

        return res.send(currentUser);
    } catch (error) {
        console.error('Error updating user data:', error);
        return res.status(500).send({ message: 'Error updating user data' });
    }
};

export const resetPassword = async (req, res) => {
    const { identifier, newPassword } = req.body;

    try {
        // Buscar el usuario por su nombre de usuario o correo electrónico
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        return res.status(500).send({ message: 'Error del servidor' });
    }
};

export const getUserData = async (req, res) => {
    try {
        const currentUser = req.user;

        if (!currentUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send(currentUser);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).send({ message: 'Error fetching user data' });
    }
};
