import User from '../model/user.js';

// create new user (user allowed)
export const createNewUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: 'successful',
      data: saveUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// get all valid users (only admin allowed)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: 'users found',
      data: users
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found, try again'
    });
  }
};

// get single user( admin and user allowed)
export const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({
      success: true,
      message: 'successful',
      data: user
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found, try again'
    });
  }
};

// update user (user allowed)
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId,
      { $set: req.body },
      { new: true });
    res.status(200).json({
      success: true,
      message: 'successful',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong, try again'
    });
  }
};

// delete user (user and admin allow)
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const delUser = await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: 'successfully deleted user',
      data: delUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something weng wrong, try again'
    });
  }
};
