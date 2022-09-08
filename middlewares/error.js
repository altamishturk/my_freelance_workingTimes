const errorhandler = require('../utils/ErrorHandler');


const errorMIddleware = (error,req,res,next)=>{
    error.code = error.code || 500;
    error.message = error.message || "internal Server Error";


    res.status(error.code).json({
        success: false,
        message: error.message,
        // error: error.stack
    })
}


module.exports = errorMIddleware;