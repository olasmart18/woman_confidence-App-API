import Story from '../model/userStory.js';
// import comment from '../model/comment.js';

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
  const composeStory = new Story({
    story: req.body.story,
    comment: req.body.comment
  });
  try {
    const postStory = await composeStory.save();
    res.status(200).json({
      success: true,
      message: 'successful',
      data: postStory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error, try again'
    });
  }
};

// write comment (access: users and admin);
export const comments = async (req, res) => {
  const comment = req.body.comment;
  try {
    const myComment = await Story.findByIdAndUpdate({ _id: req.params.id },
      { $set: { comment: comment } },
      { new: true });
    res.status(200).json({
      success: true,
      message: 'successful',
      data: myComment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'somrthing went wrong, try again'
    });
  }
}
;
