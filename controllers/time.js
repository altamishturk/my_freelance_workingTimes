const Time = require('../models/time');
const cloudinary = require('cloudinary').v2;


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

        let times;

        if (req.query.startDate) {
            times = await Time.find().where('startTime').gte(req.query.startDate).lte(req.query.endDate);
        }
        else{
            times = await Time.find();
        }


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
        const {startTime,endTime,description,image} = req.body;

        if (!startTime || !endTime ) {
            res.josn({
                success: false,
                message: 'startTime and endTime are required'
            })
        }

        
        let data = await cloudinary.uploader.upload(image,{folder: 'freelancing_times_images'});

        const time = await Time.create({startTime,endTime,description,image:{ publicId: data.public_id, url: data.url }});


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

        console.log(req.body);

        let time = await Time.findById(req.params.id);

        if (!time) {
            res.json({
                success: false,
                message: 'invalid id',
                time
            })
        }

        time.isPaid = isPaid;

        await time.save();

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

        await cloudinary.uploader.destroy(time.image.publicId);

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