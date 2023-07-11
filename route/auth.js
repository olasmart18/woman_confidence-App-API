import express from 'express';
import { login, register } from '../controllers/authController.js'
const route = express.Router();

route.post('/auth/register', register);
route.post('/auth/login', login);


export default route;