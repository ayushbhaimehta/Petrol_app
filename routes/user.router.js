const express = require('express');
const {
    registerNewUser,
    addAdressController,
    getByUsernameController,
    updateAddress,
    updatePhoneController,
    getByPhoneNoController,
    sendOtpController,
    verifyOtpController } = require('../controllers/user.controller')
// const { otpService } = require('../Dao/user.dao')
const { authTokenValidator } = require('../middlewares/authTokenValidator');
const userRouter = express.Router();

userRouter.get('/getbyusername/:username', authTokenValidator, getByUsernameController,);//working
userRouter.get('/getbyphoneno/:phoneno', authTokenValidator, getByPhoneNoController,);//working
userRouter.post('/register', authTokenValidator, registerNewUser);//working
// userRouter.post('/login', loginController);
userRouter.post('/updatephone', authTokenValidator, updatePhoneController,);//working
userRouter.post('/updateAddress', authTokenValidator, updateAddress,);//working
userRouter.post('/addAddress', authTokenValidator, addAdressController,);//working
userRouter.post('/sendotp', sendOtpController);//working
userRouter.post('/verifyOtp', verifyOtpController);//working

module.exports = userRouter;