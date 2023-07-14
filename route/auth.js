import express from 'express';
import { login, pwdResetLink, register } from '../controllers/authController.js'
const route = express.Router();

route.post('/auth/register', register);
route.post('/auth/login', login);
route.post('/auth/reset-password', pwdResetLink)


export default route;