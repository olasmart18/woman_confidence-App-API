// modules & packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import dbconnect from './config/dbConfig.js';
import userRoute from './route/user.js';
import homeRoute from './route/home.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', userRoute);
app.use('/', homeRoute);

// test route
app.get('/', (req, res) => {
  res.status(200).json({
    projectName: 'woman confidence app',
    language: 'javascript',
    sever: 'express.js'
  });
});

app.listen(PORT, () => {
  dbconnect();
  console.log(`serving on port ${PORT}`);
});
