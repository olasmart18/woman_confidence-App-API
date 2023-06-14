import express from 'express';

import {
  homePage,
  dailyQuote,
  notifications,
  recentStory,
  councellor,
  events,
  discoverGroup
} from '../controllers/homeController.js';

const route = express.Router();

route.get('/home', homePage);
route.get('/home/event', events);
route.get('/home/notification', notifications);
route.get('/home/councellor', councellor);
route.get('/home/stories', recentStory);
route.get('/home/dailyQuote', dailyQuote);
route.get('/home/groups', discoverGroup);

export default route;
