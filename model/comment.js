import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  // comment: [{
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Story'
  // }]
  comment : String
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
