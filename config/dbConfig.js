import mongoose from 'mongoose';

const dbName = 'WomanAppDB';
// function to connect to db
const dbconnect = async (err) => {
  if (!err) {
    await mongoose.connect(process.env.MONGO_URI + dbName);
    console.log('connected to db');
  } else {
    console.log(err);
  }
};

export default dbconnect;
