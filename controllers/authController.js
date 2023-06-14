import bcrypt from 'bcrypt';

import User from '../model/user.js';

// resgister new user

export const register = async (req, res) => {
  try {
    // hash password before saving to new registration
    const email = req.body.email;
    const password = req.body.password;

    // checking if user already exist
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      const hash = bcrypt.hashSync(password, 10);

      // create new registration
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email,
        password: hash
      });

      const saveUser = await newUser.save();
      res.status(200).json({
        success: true,
        message: 'successful',
        data: saveUser
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User already exist, please Login'
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'An error occure, please try again'
    });
  }
}
;

// login user with hash passord

export const login = async (req, res) => {
try {
    const email = req.body.email;
    const password = req.body.password;

    // checking for correct user email in db
    const findEmail = await User.findOne({email: email});
    if (findEmail) {
        const checkCorrectPwd = bcrypt.compareSync(password, findEmail.password);
        if(!checkCorrectPwd) {
            res.status(404).json({
                success: false,
                message: 'incorrect password or user'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Login successful'
            })
        }
    } else {
        res.status(404).json({
            success: false,
            message: 'email does not exist'
        })
    }
} catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong while loggingIn, try again'
    })
}
}
;
