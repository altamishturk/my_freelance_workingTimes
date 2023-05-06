const express = require('express');
const Router = express.Router();
const {getTimes, newTime, getUnpaidTimes,getTimeById, getpPaidTimes, updateTime, deleteTime,updateDescriptionAndImageOfTime} = require('../controllers/time');
const {isLoggedIn} = require("../middlewares/auth");



Router.get('/',getTimes);
Router.get('/timeid/:id', getTimeById);
Router.get('/paid', getpPaidTimes);
Router.get('/unpaid', getUnpaidTimes);
Router.post('/',isLoggedIn,newTime);
Router.put('/:id',updateTime);
Router.put('/update/:id',updateDescriptionAndImageOfTime);
Router.delete('/:id',deleteTime);




module.exports =  Router;