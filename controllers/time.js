const Time = require('../models/time');

exports.getUnpaidTimes = async (req,res,next)=>{

    try {
        const times = await Time.find({isPaid: false});


        res.json({
            success: true,
            message: "successfully fatched all Unpaid times",
            times
        })
        
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not fatch times",
            error
        })
    }

}


exports.getpPaidTimes = async (req,res,next)=>{

    try {
        const times = await Time.find({isPaid: true});


        res.json({
            success: true,
            message: "successfully fatched all paid times",
            times
        })
        
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not fatch times",
            error
        })
    }

}


exports.getTimes = async (req,res,next)=>{

    try {
        const times = await Time.find();


        res.json({
            success: true,
            message: "successfully fatched all times",
            times
        })
        
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not fatch times",
            error
        })
    }

}


exports.newTime  = async (req,res,next)=>{
    try {
        const {startTime,endTime} = req.body;

        if (!startTime || !endTime) {
            res.josn({
                success: false,
                message: 'startTime and endTime are required'
            })
        }

        const time = await Time.create({startTime,endTime});

        res.json({
            success: true,
            message: 'new time added successfully',
            time
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not create time",
            error
        })
    }
}


exports.updateTime  = async (req,res,next)=>{
    try {

        let {isPaid} = req.body;

        const time = await Time.findByIdAndUpdate(req.params.id,{isPaid})

        res.json({
            success: true,
            message: 'time updated successfully',
            time
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not update time",
            error
        })
    }
}


exports.deleteTime  = async (req,res,next)=>{
    try {
        const time = await Time.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'time deleted successfully',
            time
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: "could not delete time",
            error
        })
    }
}