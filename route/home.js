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

route.get('/wmapp/home', homePage);
route.get('/wmapp/home/event', events);
route.get('/wmapp/home/notification', notifications);
route.get('/wmapp/home/councellor', councellor);
route.get('/wmapp/home/stories', recentStory);
route.get('/wmapp/home/dailyQuote', dailyQuote);
route.get('/wmapp/home/groups', discoverGroup);

export default route;
