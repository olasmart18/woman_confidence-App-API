import express from 'express';
import { login, pwdResetLink, register, resetPassword } from '../controllers/authController.js'
const route = express.Router();

route.post('/auth/register', register);
route.post('/auth/login', login);
route.post('/auth/reset-password', pwdResetLink)
route.post('/auth/reset-password/:userId/:token', resetPassword);



export default route;