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
const userRouter = express.Router();

userRouter.get('/getbyusername/:username', getByUsernameController);//working
userRouter.get('/getbyphoneno/:phoneno', getByPhoneNoController);//working
userRouter.post('/register', registerNewUser);//working
// userRouter.post('/login', loginController);
userRouter.post('/updatephone', updatePhoneController);//working
userRouter.post('/updateAddress', updateAddress);//working
userRouter.post('/addAddress', addAdressController);
userRouter.post('/sendotp', sendOtpController);//working
userRouter.post('/verifyOtp', verifyOtpController);//working

module.exports = userRouter;