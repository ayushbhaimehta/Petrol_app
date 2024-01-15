const express = require('express');
const {
    addDriversController,
    driverLoginController,
    getOrdersController,
    getAllOrdersController,
    adminLoginController,
    updateAssignedOrdersController,
    getOnlyPetrolController
} = require('../controllers/driver.controller.js')

const driverRouter = express.Router();

driverRouter.post('/adminlogin', adminLoginController);//working


driverRouter.post('/addDrivers', addDriversController,);//frist driver
// driverRouter.post('/testing', testingController)//working
driverRouter.get('/getOrders/:phoneNo', getOrdersController);
driverRouter.post('/login', driverLoginController);//working
driverRouter.get('/getAllorders/:phoneNo', getAllOrdersController);
driverRouter.post('/updateAssignedOrders', updateAssignedOrdersController);//working
// multiple queries for completed order
// petrol only
driverRouter.get('/getOnlyPetrol/:phoneNo', getOnlyPetrolController)
// diesel only 
// premium only
// active orders
// pending orders

module.exports = driverRouter