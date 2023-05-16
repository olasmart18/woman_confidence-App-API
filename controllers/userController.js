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
    res.status(401).json({
      success: false,
      message: 'something went wrong, try again'
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

};

// update user (user allowed)
export const updateUser = async (req, res) => {

};

// delete user (user and admin allow)
export const deleteUser = async (req, res) => {

};
