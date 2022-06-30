const mongoose = require('mongoose');


const connect = async ()=>{
    try {
        await mongoose.connect(process.env.URL);
        
        console.log('connected to the database successfully');
    } 
    catch (error) {
        onsole.log('could not connect to the database');
    }
}


module.exports = connect;