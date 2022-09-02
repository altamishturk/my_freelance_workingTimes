const jwt = require('jsonwebtoken')


module.exports.isLoggedIn = async (req,res,next)=>{
    
    // check token first in cookies
    let token = req.cookies.token;

    // if token not found in cookies, check if header contains Auth field
    if (!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
    }

   
    if (!token) {
        return next(res.status(401).json({
            success: true,
            messgae: 'login to access this resource'
        }))
    }

    const jwtData = await jwt.verify(token,process.env.JWT_SECRET);


    if (!jwtData) {
        return next(res.status(401).json({
            success: true,
            messgae: 'token has been expired'
        }))
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