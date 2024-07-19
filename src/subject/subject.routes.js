'use strict';
import { Router } from 'express';
import { addSubject, deleteSubject } from '../subject/subject.controller.js'; // Ajusta la ruta según la ubicación de tu controlador

const api = Router();

api.post('/add', addSubject);

api.delete('/delete/:id', deleteSubject);

export default api;