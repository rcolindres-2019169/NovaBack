import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { login, registerClient, updateUserData, resetPassword, getUserData } from './user.controller.js';

const api = express.Router();


//Rutas publicas
api.post('/registerClient', registerClient)
api.post('/login', login)
api.put('/update/:id', updateUserData)
api.post('/resetPassword', resetPassword)
api.get('/get', validateJwt, getUserData)



//Rutas Privadas



export default api

