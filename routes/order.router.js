const express = require('express');
const {
    getAllOrdersController,
    addOrderController,
    updateOrderDetailsController,
    updateOrderStatusController,
    getByIdController
} = require('../controllers/order.controller.js')
const orderRouter = express.Router();

// const { otpService } = require('../Dao/user.dao')
// const { authTokenValidator } = require('../middlewares/authTokenValidator');

orderRouter.get('/getOrders/:phoneNo', getAllOrdersController,);//working
orderRouter.post('/addOrder', addOrderController);//working
// getBy Id
orderRouter.get('/getOrderById/:_orderId', getByIdController)
orderRouter.post('/updateOrderDetails', updateOrderDetailsController)//working
orderRouter.post('/updateOrderStatus', updateOrderStatusController)//working


module.exports = orderRouter;