const express = require('express');
const {
    addDriversController,
    driverLoginController,
    getOrdersController,
    getAllOrdersController,
    adminLoginController
} = require('../controllers/driver.controller.js')

const driverRouter = express.Router();

driverRouter.post('/adminlogin', adminLoginController);//working


driverRouter.post('/addDrivers', addDriversController,);//frist driver
// driverRouter.post('/testing', testingController)//working
driverRouter.get('/getOrders/:phoneNo', getOrdersController);
driverRouter.post('/login', driverLoginController);//working
driverRouter.get('/getAllorders/:phoneNo', getAllOrdersController);
// update driver details
// multiple queries for completed order
// petrol only
// diesel only 
// premium only
// active orders
// pending orders

module.exports = driverRouter