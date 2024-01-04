const express = require('express');
const { registerController } = require('../controllers/user.controller')

const userRouter = express.Router();

// userRouter.get('/getbyusername/:username', getByUsernameController);
// userRouter.get('/getbyphoneno/:phoneno', getByPhoneNoController);
userRouter.post('/register', registerController);
// userRouter.post('/login', loginController);
// userRouter.post('/updatepassword', updatePasswordController);
// userRouter.post('/login', loginController);
// userRouter.post('/login', loginController);

module.exports = userRouter;