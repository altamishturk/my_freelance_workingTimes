const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const db_connection = require('./connection/db_connection');


// call function to connect to the db 
db_connection();


// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

// render ejs page 
app.get('/',(req,res)=>{
    res.render('index');
})

const timesRoute = require('./routes/time');
app.use('/api/v1/time',timesRoute)


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})