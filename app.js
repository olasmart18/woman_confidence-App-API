// modules & packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import dbconnect from './config/dbConfig.js';
import userRoute from './route/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoute);

// test route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'new project',
    language: 'javascript',
    sever: 'expressjs'
  });
});

app.listen(PORT, () => {
  dbconnect();
  console.log(`serving on port ${PORT}`);
});
