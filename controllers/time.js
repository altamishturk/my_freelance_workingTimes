const Time = require('../models/time');
const cloudinary = require('cloudinary').v2;
const bigPromice = require('../middlewares/bigPromise');
const ErrorHandler = require('../utils/ErrorHandler')


exports.getUnpaidTimes = bigPromice(async (req,res,next)=>{


        const times = await Time.find({isPaid: false});


        res.status(200).json({
            success: true,
            message: "successfully fatched all Unpaid times",
            times
        })

})


exports.getpPaidTimes = bigPromice(async (req,res,next)=>{

    
        const times = await Time.find({isPaid: true});


        res.status(200).json({
            success: true,
            message: "successfully fatched all paid times",
            times
        })

})


exports.getTimes = bigPromice(async (req,res,next)=>{

        let times;

        if (req.query.startDate) {
            times = await Time.find().where('startTime').gte(req.query.startDate).lte(req.query.endDate);
        }
        else{
            times = await Time.find();
        }


        res.status(200).json({
            success: true,
            message: "successfully fatched all times",
            times
        })     

})


exports.newTime  = bigPromice(async (req,res,next)=>{
    
        const {startTime,endTime,description,image} = req.body;

        if (!startTime || !endTime ) {
            throw new Error('start and end time are required'); 
        }


        let time = undefined;

        if (image[0] !== '[') {
            let data = await cloudinary.uploader.upload(image,{folder: 'freelancing_times_images'});
            time = await Time.create({startTime,endTime,description,image:{ publicId: data.public_id, url: data.url }});
        }
        else{
            time = await Time.create({startTime,endTime,description})
        }
        
        

        res.status(200).json({
            success: true,
            message: 'new time added successfully',
            time
        })
})


exports.updateTime  =bigPromice( async (req,res,next)=>{
    
        let {isPaid} = req.body;

        // console.log(req.body);

        let time = await Time.findById(req.params.id);

        if (!time) {
            res.status(400).json({
                success: false,
                message: 'invalid id',
                time
            })
        }

        time.isPaid = isPaid;

        await time.save();

        res.status(200).json({
            success: true,
            message: 'time updated successfully',
            time
        })
})


exports.deleteTime  = bigPromice(async (req,res,next)=>{
 
        const time = await Time.findByIdAndDelete(req.params.id);

        if(!time){
            return next(new ErrorHandler(400,""))
        }

        await cloudinary.uploader.destroy(time.image.publicId);

        res.status(200).json({
            success: true,
            message: 'time deleted successfully',
            time
        })
    
})