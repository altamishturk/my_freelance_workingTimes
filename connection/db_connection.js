const mongoose = require('mongoose');


const connect = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.URL);
        
        console.log('connected to the database successfully');
    } 
    catch (error) {
        res.json({
            succes: false,
            message: 'someting went wrong while connecting to the database',
            error
        })
    }
}


module.exports = connect;