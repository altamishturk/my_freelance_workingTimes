const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');


module.exports.isLoggedIn = async (req,res,next)=>{
    
    
    // check token first in cookies
    let token = req.cookies.token;

    // if token not found in cookies, check if header contains Auth field
    if (!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
    }

    
   
    if (!token) {
        return next(new ErrorHandler(401,'login to access this resource'));
    }

    let jwtData =  '';
   
    try {
        jwtData =  jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        return next(new ErrorHandler(401,'Invalid JSON Token'))
    }


    if (!jwtData) {
        return next(new ErrorHandler(401,'token has been expired'))
    }

    req.user = jwtData.user;
    req.token = token;

    next();
}



module.exports.isAuthorized = (role) =>{
    
    return (req,res,next) => {
    
        if(req.user.role !== role){
            return next(res.status(401).json({
                success: false,
                message: `user wuth ${req.user.role} role can't access this resource`
            }))
        }
        next();
    }
}