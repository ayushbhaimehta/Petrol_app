const express = require('express');
const { getAllOrdersController
} = require('../controllers/order.controller.js')
const orderRouter = express.Router();

// const { otpService } = require('../Dao/user.dao')
// const { authTokenValidator } = require('../middlewares/authTokenValidator');

orderRouter.get('/getOrders/:phoneNo', getAllOrdersController,);//working
orderRouter.post('/addOrder',);//working

module.exports = orderRouter;