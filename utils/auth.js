import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.Cookie.accessToken;
    console.log(token);
    if (!token) return res.status(401).json({
        message: 'unauthorised token',
        status: 'unathorised'
    })
   await jwt.verify(token, process.env.JWT_SECRET_KEY)
    .then((user) => {
        req.user = user;
       next(); 
    }).catch((err) => {
        res.status(404).json({
            message: err.message,
            status: 'not found'
        })
    })  
};

// verify validation of user
 const verifyUser  = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id !== req.params.id)
        return res.status(401).json({
            message: 'not authenticated'
        })
        next();
        console.log(req.user.id, req.params.id);
    })
 }
 export default verifyUser;
