import express from 'express';
import { register } from '../controllers/authController.js'
const route = express.Router();

route.post('/auth/register', register);

export default route;