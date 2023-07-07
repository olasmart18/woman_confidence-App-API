import express from 'express';

import {
  getallStories,
  writeStories,
  comments
} from '../controllers/communityController.js';

const route = express.Router();

route.post('/story/:userId', writeStories);
route.get('/stories', getallStories);
route.post('/comment/:userId/:storyId', comments);

export default route;
