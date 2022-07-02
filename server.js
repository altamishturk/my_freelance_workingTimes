const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const db_connection = require('./connection/db_connection');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


// call function to connect to the db 
db_connection();


// middlewares 
app.set('view engine','ejs');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


cloudinary.config({ 
    cloud_name: 'dmf67qjzk', 
    api_key: '661786244164119', 
    api_secret: 'rPrMhajKeN4N90I5ANgYzM8Oba4' 
  });





// render ejs page 
app.get('/',(req,res)=>{
    res.render('index');
})

const timesRoute = require('./routes/time');
app.use('/api/v1/time',timesRoute)


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})