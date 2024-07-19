'use strict'

import { Router } from "express"
import { getS, save } from "./scholarship.controller.js"

const api = Router()

api.post('/save', save)
api.get('/getS', getS)

export default api