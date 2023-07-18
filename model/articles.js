import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
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

const Story = mongoose.model('Article', articleSchema);

export default Story;