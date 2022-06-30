const express = require('express');
const Router = express.Router();
const {getTimes, newTime, getUnpaidTimes, getpPaidTimes, updateTime, deleteTime} = require('../controllers/time');




Router.route('/').get(getTimes)
Router.route('/paid').get(getpPaidTimes)
Router.route('/unpaid').get(getUnpaidTimes)
Router.route('/').post(newTime);
Router.route('/:id').put(updateTime);
Router.route('/:id').delete(deleteTime);




module.exports =  Router;