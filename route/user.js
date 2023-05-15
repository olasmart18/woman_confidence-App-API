import express from 'express';

import {
  createNewUser,
  getSingleUser,
  getUsers,
  deleteUser,
  updateUser
} from '../controllers/userController.js';

const route = express.Router();

route.post('/users', createNewUser);
route.get('/users', getUsers);

export default route;
