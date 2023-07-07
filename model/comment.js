import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment : String,
  postId: {
    type: mongoose.Types.ObjectId,
    ref: 'userStory',
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
