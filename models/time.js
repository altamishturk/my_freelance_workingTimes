const mongoose = require('mongoose');


const timeSchema = mongoose.Schema({
    startTime:{
        type: Number 
    },
    endTime: {
        type: Number
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('time',timeSchema)