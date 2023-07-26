 import Story from '../model/userStory.js';
import User from '../model/user.js';
import Comment from '../model/comment.js';
import Group from "../model/groups.js";

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

//  delete story
export const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.params.userId;
   const findStory =  await Story.findById(storyId)
   if(!findStory) return res.json({
    message: 'no such story'
   })
   const findUser = await User.findById(userId)
   if (!findUser)  return res.json({
    message: 'no user found'
  })
      if(findUser._id !== findStory.userId){
        // please look into this condition and contribute,
        // its not just working
        console.log(findUser._id);
        console.log(findStory.userId);
        //  console.log(findUser._id, findStory.userId)
      return res.status(401).json({
        message: 'you cannot delete this post'
      })
      }
      // find all comment in comment collection that has
      // the postId and delete them all 
      await Comment.deleteMany({postId: storyId})
      .then(() => {
         findStory.deleteOne() // delete story
     return res.json({
        message: 'you deleted post'
      })
      }).catch((err) => {
         if(err) return res.status(401).json({
        message: err.message
      })
      })
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: err
    })
  }
}

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

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    const storyId =  req.params.storyId;
   
    // find valid user or admin to delete comment
    const findUser = await User.findOne({_id: userId})
    if(!findUser) return res.json({
      message: 'not a valid user'
    })
    // find the post to delete comment
    const findPost = await Story.findOne({_id: storyId});
    if (!findPost) return res.json({
      message: 'no such post'
    });
    // find the comment
    const findComment = await Comment.findOne({ _id: commentId})
     if (!findComment) return res.json({
      message: 'no such comment'
    })
    // find commentId index in array
    const commentIndex = findPost.commentId.indexOf(findComment)
    // remove comment from array by it index
   const removeComment = findPost.commentId.splice(commentIndex, 1);
   if (!removeComment) return res.json({
    message: 'cannot delete comment'
   })
   findPost.save() // save post after removing comment
      // delete comment from comment collection in db
      await Comment.findOneAndDelete({_id: commentId})
      .then((del) => {
        res.json({
          message: 'successful',
          data: del._id
        })
      })
} catch (err) {
    res.status(500).json({
      success: false,
      messsage: 'something went wrong'
    })
  }
}

// leave group
export const exitGroup = async (req, res) => {
  try {
    await User.findOne({ _id: req.params.userId}).then( async (user) => {
      if (!user) return res.status(404).json({
        succes: false,
        message: 'no user of such found'
      });
      // find group and remove user
      await Group.findByIdAndUpdate({ _id: req.params.groupId},
        { $pull: {groupMember: user._id }},
        { new: true }).then((group) => {
           res.status(200).json({
          succes: true,
          message: `you left ${group.groupName} group`
        })
        })
    })
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: err.message
    });
  }
}