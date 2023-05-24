import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    Date: Date.now()
  }
});

const Comment = mongoose.Model('Comment', commentSchema);

export default Comment;
