import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema({
//   comment: {
//     type: String
//   }
// });
// const likeSchema = new mongoose.Schema({
//   likes: {
//     types: Number
//   }
// });

// const shareSchema = new mongoose.Schema({
//   share: {
//     tpye: Number
//   }
// });

const userStorySchema = new mongoose.Schema({
  story: {
    type: String
  },
  comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
  // comment: String

//   comment: [commentSchema],
//   like: [likeSchema],
//   share: [shareSchema]
}, { timestamps: true });

const Story = mongoose.model('Story', userStorySchema);

export default Story;
