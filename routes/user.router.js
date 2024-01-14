const express = require('express');
const {
    registerNewUser,
    addAdressController,
    getByUsernameController,
    updateAddress,
    updatePhoneController,
    getByPhoneNoController,
    sendOtpController,
    verifyOtpController,
    updateDetailsController,
    addressDeleteController,
    sendEmailOtp,
    verifyEmailOtp
    // emailOtpVerifyController
} = require('../controllers/user.controller')
const { authTokenValidator } = require('../middlewares/authTokenValidator');
const userRouter = express.Router();

// userRouter.get('/getbyusername/:username', authTokenValidator, getByUsernameController,);//working
userRouter.get('/getbyphoneno/:phoneno', authTokenValidator, getByPhoneNoController,);//working
userRouter.post('/updatephone', authTokenValidator, updatePhoneController,);//working
userRouter.post('/updateAddress', authTokenValidator, updateAddress,);//working
userRouter.post('/addAddress', authTokenValidator, addAdressController,);//working
userRouter.delete('/deleteAddress', authTokenValidator, addressDeleteController);//working
userRouter.post('/sendotp', sendOtpController);//working
userRouter.post('/verifyOtp', verifyOtpController);//working
userRouter.post('/emailSendOtp', sendEmailOtp);//working
userRouter.post('/emailVerifyOtp', verifyEmailOtp);//working
userRouter.post('/updatedetails', updateDetailsController,);// changes need to be made
// userRouter.post('/middleware', authTokenValidator)// just for debugging

module.exports = userRouter;