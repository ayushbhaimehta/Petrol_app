const express = require('express');
const {
    addDriversController,
    driverLoginController,
    getOrdersController
} = require('../controllers/driver.controller.js')

const driverRouter = express.Router();

driverRouter.post('/addDrivers', addDriversController,);//frist driver
// driverRouter.post('/testing', testingController)//working
driverRouter.post('/getOrders/:phoneNo', getOrdersController);
driverRouter.post('/login', driverLoginController);//working
// update driver details
// multiple queries for completed order
// petrol only
// diesel only 
// premium only
// active orders
// pending orders

module.exports = driverRouter