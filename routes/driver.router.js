const express = require('express');
const {
    addDriversController
} = require('../controllers/driver.controller.js')

const driverRouter = express.Router();

driverRouter.post('/addDrivers', addDriversController,);//under progress
// edit driver orders list for adding more order ids 
// after completion earned will be changing
// multiple queries for completed order
// petrol only
// diesel only 
// premium only
// active orders
// pending orders

module.exports = driverRouter