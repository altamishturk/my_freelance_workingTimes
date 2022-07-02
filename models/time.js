const mongoose = require('mongoose');


const timeSchema = mongoose.Schema({
    startTime:{
        type: Number 
    },
    endTime: {
        type: Number
    },
    description: {
        type: String
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    image: {
        publicId:{
            type: String
        },
        url: {
            type: String
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('time',timeSchema)