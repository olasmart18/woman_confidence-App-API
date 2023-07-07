import mongoose from 'mongoose';

const userStorySchema = new mongoose.Schema({
  story: {
    type: String
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },

  commentId: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
 
}, { timestamps: true });

const Story = mongoose.model('Story', userStorySchema);

export default Story;
