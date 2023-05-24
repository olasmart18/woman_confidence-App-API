import mongoose from 'mongoose';

const userStorySchema = new mongoose.Schema({
  story: {
    type: String
  },
  comment: {
    type: mongoose.objectId,
    ref: 'Comment'
  }
}, { timestamps: true });

const Stories = mongoose.Model('Stories', userStorySchema);

export default Stories;
