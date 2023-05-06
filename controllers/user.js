const User = require('../models/user');
const bcrypt = require('bcrypt');
const bigPromise = require('../middlewares/bigPromise');
const {sendToken} = require('../utils/sendToken');
const { validationResult } = require('express-validator');


module.exports.getLoggedInUser = bigPromise(async (req,res,next)=>{

    res.status(200).json({
        success: true,
        message: 'user fount',
        user: req.user
    })

})


module.exports.signup = bigPromise(async (req,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: errors.array()[0].msg 
    });
    }
    
    const userExists = await User.findOne({email: req.body.email})

    if (userExists) {
        return next(res.status(404).json({
            success: false,
            message: 'user is already exists with this email'
        }))
    }

    let user = new User(req.body);

    if (!user) {
        return next(res.status(404).json({
            success: false,
            message: 'could not create account'
        }))
    }

    // save hashed password 
    await user.hashIt(req.body.password);
    
    await user.save();

    // send token to the user in response 
    sendToken(req,res,next,user)

})


module.exports.login = bigPromise(async (req,res,next)=>{

    const user = await User.findOne({email: req.body.email});


    // const has = await bcrypt.hash("ALTa@8684864632",6);
    // console.log(has);

    if (!user) {
        return next(res.status(404).json({
            success: false,
            message: 'Email or Password Does not match'
        }))
    }


    const isAuthenticate =  bcrypt.compare(req.body.password, user.passwordhash);


    if (!isAuthenticate) {
        return next(res.status(404).json({
            success: false,
            message: 'Email or Password Does not match'
        }))
    }

    // send token to the user in response 
    sendToken(req,res,next,user)
})


module.exports.logout = bigPromise(async (req,res,next)=>{

//clear the cookie
res.cookie("token", null, {
expires: new Date(Date.now()),
httpOnly: true,
});

//send JSON response for success
res.status(200).json({
succes: true,
message: "Logout success",
});
})