const express = require('express');
const {
    getAllOrdersController,
    addOrderController,
    updateOrderDetailsController,
    updateOrderStatusController,
    getByIdController
} = require('../controllers/order.controller.js');
const { authTokenValidator } = require('../middlewares/authTokenValidator');
const { driverTokenValidator } = require('../middlewares/driverTokenValidator.js');
const { adminTokenValidator } = require('../middlewares/adminTokenValidator.js');

const orderRouter = express.Router();

// user
orderRouter.get('/getOrders/:phoneNo', getAllOrdersController,);//working
orderRouter.post('/addOrder', addOrderController);//working checked
// getBy Id
orderRouter.get('/getOrderById/:_orderId', getByIdController)
//admin
orderRouter.post('/updateOrderDetails', updateOrderDetailsController)//working

// driver
orderRouter.post('/updateOrderStatus', updateOrderStatusController)//working


module.exports = orderRouter;