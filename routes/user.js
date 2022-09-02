const express = require("express");
const router = express.Router();
const { check} = require('express-validator');
const {getUsers,getLoggedInUser, signup, login, updateUser,deleteUser, logout} = require('../controllers/user');
const {isLoggedIn, isAuthorized} = require('../middlewares/auth');

let signupvalidation = [
    check('firstname')
.isLength({ min: 3 })
.withMessage('first name must be at least 3 chars long'),
check('lastname')
.isLength({ min: 3 })
.withMessage('last name must be at least 3 chars long'),
check('email')
.isEmail()
.withMessage('Email is required'),
check('password')
.isLength({ min: 3 })
.withMessage('password must be at least 3 chars long')
]

// router.get('/',isLoggedIn,isAuthorized('admin'),getUsers)
router.get('/loggedinuser', isLoggedIn,getLoggedInUser)
router.post('/', signupvalidation ,signup)
router.post('/login', login)
router.post('/logout', isLoggedIn,logout)
// router.delete('/:id', isLoggedIn,isAuthorized('admin'),deleteUser)


module.exports = router