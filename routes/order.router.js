const express = require('express');
const {
    getAllOrdersController,
    addOrderController,
    updateOrderDetailsController
} = require('../controllers/order.controller.js')
const orderRouter = express.Router();

// const { otpService } = require('../Dao/user.dao')
// const { authTokenValidator } = require('../middlewares/authTokenValidator');

orderRouter.get('/getOrders/:phoneNo', getAllOrdersController,);//working
orderRouter.post('/addOrder', addOrderController);//working
orderRouter.post('/updateOrderDetails', updateOrderDetailsController)
// edit order for status change assignment

module.exports = orderRouter;