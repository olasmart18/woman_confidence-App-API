import Story from '../model/userStory.js';
import User from '../model/user.js';
import Comment from '../model/comment.js';

// get all user stories (access: users amd admin)
export const getallStories = async (req, res) => {
  try {
    const stories = await Story.find({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: stories
    });
  } catch (err) {
    res.ststus(404).json({
      succes: false,
      message: 'error 404, try again'
    });
  }
};

// post stories (access: user)
export const writeStories = async (req, res) => {
 try {
  const userId = req.params.userId;
  await User.findOne({_id: userId})
  .then( async (user) => {
    if(!user) return res.json({
      message: 'sign up to continue'
    })
   const newStory = await new Story({
    story: req.body.story,
    userId: userId
  }).save()
    res.status(200).json({
      success: true,
      message: 'successful',
      data: newStory
    });
  }).catch((err) => {
    res.json({
      message: err.messages,
      data: err
    })
  })
  }catch (err) {
    res.status(400).json({
      success: false,
      message: 'error, try again'
    });
  }
};

// write comment (access: users and admin);
export const comments = async (req, res) => {
  try {
     const comment = req.body.comment;
     const storyId = req.params.storyId;
     const userId = req.params.userId;

     await User.findById(userId) // find valid user
     .then( async (user) => {
      if (!user) return res.json({ message: 'not a user'})
      await Story.findById(storyId) // find story 
      .then( async (story) => {
        // return if story not find
        if(!story) return res.json({ message: 'not valid story'})
        // create new comment 
       const newComment = await new Comment({
        comment: comment,
        postId: storyId,
        userId: userId 
        }).save() // save comment
        // append comment id in story collection 
         const myComment = await Story.findByIdAndUpdate(storyId,
      { $push: { commentId: newComment } },
      { new: true });
   return res.status(200).json({
      success: true,
      message: 'successful',
      data: newComment
    });
      })
     }).catch((err) => {
      res.json({
        message: err.messages,
        data: err
      })
     })
   
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'somrthing went wrong, try again'
    });
  }
}
;
