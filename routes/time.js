const express = require('express');
const Router = express.Router();
const {getTimes, newTime, getUnpaidTimes,getTimeById, getpPaidTimes, updateTime, deleteTime,updateDescriptionAndImageOfTime} = require('../controllers/time');




Router.route('/').get(getTimes)
Router.route('/timeid/:id').get(getTimeById)
Router.route('/paid').get(getpPaidTimes)
Router.route('/unpaid').get(getUnpaidTimes)
Router.route('/').post(newTime);
Router.route('/:id').put(updateTime);
Router.route('/update/:id').put(updateDescriptionAndImageOfTime);
Router.route('/:id').delete(deleteTime);




module.exports =  Router;