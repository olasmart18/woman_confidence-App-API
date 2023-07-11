import bcrypt from "bcrypt";
import User from "../model/user.js";

//register new user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // check for existing user
    await User.findOne({ email: email }).then( async (user) => {
      if (user)
        return res.status(400).json({
          message: `user already exist , login with ${user.email}`,
        });
      // hash password before save to db
      const saltRound = 10;
      const salt =  bcrypt.genSaltSync(saltRound);
      const hash = bcrypt.hashSync(password, salt);
      // register new user 
      const newReg = new User ({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
      })
      // save new registered to db
      await newReg.save().then((reg) => {
        res.json({
            status: 'OK',
            message: 'successful register, please login',
            data: reg
        })
      })
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
