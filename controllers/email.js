const bigPromice = require('../middlewares/bigPromise');
const sendEmail = require('../utils/sendEmail');


exports.sendEmail = bigPromice(async (req,res,next)=>{

        const data = await sendEmail("altamishpasha@gmail.com","Enquery",JSON.stringify(req.body));



        res.status(200).json({
            success: true,
            message: "___",
            ...data
        })

})