const e = require("express");

class Errorhandler extends Error {
    constructor(code,message){
        super(message);
        this.code = code;

        Error.captureStackTrace(this,this.constructor)
    }
}



module.exports = Errorhandler;