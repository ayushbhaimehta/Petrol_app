const express = require('express');
const {
    addDriversController,
    testingController,
    driverLoginController
} = require('../controllers/driver.controller.js')

const driverRouter = express.Router();

driverRouter.post('/addDrivers', addDriversController,);//under progress
driverRouter.post('/testing', testingController)//working
driverRouter.post('/login', driverLoginController)//
// driver login
// edit driver orders list for adding more order ids 
// multiple queries for completed order
// petrol only
// diesel only 
// premium only
// active orders
// pending orders

module.exports = driverRouter