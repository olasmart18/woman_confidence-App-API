import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({});

const Home = mongoose.model('Home', homeSchema);

export default Home;
