import express from 'express';

import {
  homePage,
  dailyQuote,
  // notifications,
  recentStory,
  councellor,
  events,
  discoverGroup,
  createEvent,
  createQuote,
  createGroup,
  joinGroup,
  newCouncellor,
  fetchQuote
} from '../controllers/homeController.js';
import verifyUser from '../utils/auth.js';


const route = express.Router();

route.get('/wmapp/home', homePage);
route.get('/wmapp/home/event', events);
// route.get('/wmapp/home/notification', notifications);
route.get('/wmapp/home/councellor', councellor);
route.get('/wmapp/home/stories', verifyUser, recentStory);
route.get('/wmapp/home/dailyquote', dailyQuote);
route.get('/wmapp/home/groups', discoverGroup);
route.get('/wmapp/home/quote', fetchQuote);
route.post('/wmapp/home/event/create/:userId', createEvent);
route.post('/wmapp/home/quote/create/:userId', createQuote);
route.post('/wmapp/home/group/create/:userId', createGroup);
route.post('/wmapp/home/group/join/:groupId/:userId', joinGroup);
route.post('/wmapp/home/councellor/:userId', newCouncellor);


export default route;
