const express = require('express');
const { registerNewUser, loginController, getByUsernameController, updatePhoneController, getByPhoneNoController } = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.get('/getbyusername/:username', getByUsernameController);
userRouter.get('/getbyphoneno/:phoneno', getByPhoneNoController);
userRouter.post('/register', registerNewUser);
userRouter.post('/login', loginController);
userRouter.post('/updatephone', updatePhoneController);
// userRouter.post('/login', loginController);
// userRouter.post('/login', loginController);

module.exports = userRouter;