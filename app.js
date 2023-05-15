// modules & packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'new project',
    language: 'javascript',
    sever: 'expressjs'
  });
});

app.listen(3000, () => {
  console.log('serving on port 3000');
});
