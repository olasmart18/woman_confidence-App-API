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
route.get('/users/:id', getSingleUser);
route.delete('/users/:id', deleteUser);
route.put('/users/:id', updateUser);

export default route;
