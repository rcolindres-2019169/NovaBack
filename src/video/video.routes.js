'use strict'

import { Router } from "express"
import { save, update, deleteA, get, search } from "./video.controller.js"
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/save', save, validateJwt)
api.put('/update/:id', update, validateJwt)
api.delete('/delete/:id', deleteA, validateJwt)
api.get('/get', get)
api.post('/search', search)

export default api