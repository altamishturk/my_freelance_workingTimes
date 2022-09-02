var jwt = require('jsonwebtoken');

module.exports.sendToken = async (req,res,next,user)=>{
    
    const token = jwt.sign({user}, process.env.JWT_SECRET);

    const options = {
        expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * process.env.JWT_EXPITY),
        httpOnly: true,
    };

    user.password = undefined;

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });

}