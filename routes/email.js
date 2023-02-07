const express = require('express');
const Router = express.Router();
const {sendEmail} = require('../controllers/email');


Router.route('/').post(sendEmail)



module.exports =  Router;