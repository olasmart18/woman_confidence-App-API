import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import crypto from 'crypto';
import User from "../model/user.js";
import Token from "../model/token.js";
import sendEmail from '../utils/emailTransporter.js';

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

// login existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check for exist user
        await User.findOne({ email: email}).then( (user) => {
            if(!user) return res.status(404).json({
                status: 'not found',
                message: 'not user found, please register'
            })
            // check if password match existing password
            const pwdMatch = bcrypt.compareSync(password, user.password);
            if (!pwdMatch) return res.status(401).json({
                status: 'authorise fail',
                message: 'incorrect password or username',
                alternative: 'reset password here'
            })
            // create token in the user browser
            const token = Jwt.sign({id: user._id},
                process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
                    if (!token) return res.status(401).json({
                        status: 'error',
                        message: 'not token created'
                    })
                    res.cookie('token', token, {
                       expiresIn: token.expiresIn,
                        httpOnly: true
                    }).json({
                status: 'OK',
                message: `successfully login as ${user.email}`
            })
                })
    } catch (err) {
        res.status(500).json({
            status: 'internal error',
            message: err.message
        })
    }
}

// reset password link
export const pwdResetLink = async (req, res) => {
    const { email } = req.body
    try {
        // find existing user 
        await User.findOne({ email: email }).then( async (user) => {
           if(!user) return res.status(404).json({
            message: 'user not found'
           }) 
           // check if token associated with the user exist
           await Token.findOne({userId: user._id}).then( async (token) =>{
            if (token) {
              await token.deleteOne()
            }
            // create a token and save
           const createToken = crypto.randomBytes(32).toString('hex')
           if (!createToken) return res.status(400).json({
            message: 'unable to create token'
           })
           // save token to db
           await new Token({
            token: createToken,
            userId: user._id
           }).save();
           // password reset link
           const resetLink = `${process.env.BASE_URL}/password-reset/${createToken}/${user._id}`
           await sendEmail(user.email, 'reset-password', resetLink)
           .then(() => {
            return res.status(200).json({
                message: `reset link sent to ${user.email}`,
                link: resetLink
            })
           })
           })  
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            data: err
        })
    }
    }
    
    // reset password
     export const resetPassword = async (req, res) => {
       const { userId, token } = req.params;
      try {
        const error = res.json({
          message: 'token is not valid'
        });
       
        await User.findOne({ userId: userId }).then( async (user) => {
          if (!user) return res.status(404).json({
            message: 'not a user'
          })
          await Token.findOne({ userId: user._id, token: token}).then( async (token) => {
            if (!token) return res.status(404).json({
              message: 'no token find for user'
            })
            if (token.token !== user.token) return error
            // input new password
            const password = req.body.password;
            // hash new password
            const saltRound = 10;
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(password, salt);
            await User.findByIdAndUpdate(userId,
              {$set: {password: hash}},
              {new: true}).then( async () => {
                await token.deleteOne(); // delete token after password reset
                res.json({
                message: 'password reset successfully',
                data: user._id
              })
              }).save()
          })
        })
          } catch (err) {
        res.status(500).json({
          message: err.message,
          data: err
        })
      }
    }
    