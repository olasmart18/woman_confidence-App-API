import express from 'express';

import {
  getallStories,
  writeStories,
  comments
} from '../controllers/communityController.js';

const route = express.Router();

route.post('/me/compose/story', writeStories);
route.get('/stories', getallStories);
route.put('/stories/:id', comments);

export default route;
