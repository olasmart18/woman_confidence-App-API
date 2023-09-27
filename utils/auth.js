import jwt from 'jsonwebtoken';

const verifyToken =  (req, res, next) => {
 const token =  req.cookies.token;
    if (!token) return res.status(401).json({
        message: 'unauthorised token',
        status: 'unathorised'
    })
     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) =>{
    if (err){
      return res.status(404).json({
            message: err.message,
            status: 'token not found'
        })
    }
    req.user = user
    next();
   })    
    }

// verify validation of user
 const verifyUser  = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (!req.user) {
             return res.status(401).json({
            message: 'not authenticated'
        })
        }
        next();
    })
 }
 export default verifyUser;
