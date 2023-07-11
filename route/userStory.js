import express from 'express';

import {
  getallStories,
  writeStories,
  comments,
  deleteComment,
  deleteStory
} from '../controllers/communityController.js';

const route = express.Router();

route.post('/story/:userId', writeStories);
route.get('/stories', getallStories);
route.post('/comment/:userId/:storyId', comments);
route.delete('/comment/:userId/:storyId/:commentId', deleteComment)
route.delete('/story/:userId/:storyId', deleteStory)


export default route;
