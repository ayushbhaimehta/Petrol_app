const express = require('express');
const {
    addDriversController,
    driverLoginController,
    getOrdersController,
    getAllOrdersController,
    adminLoginController,
    updateAssignedOrdersController,
    getOnlyPetrolController
} = require('../controllers/driver.controller.js');
const { driverTokenValidator } = require('../middlewares/driverTokenValidator.js');
const { adminTokenValidator } = require('../middlewares/adminTokenValidator.js')

const driverRouter = express.Router();

//admin
driverRouter.post('/adminlogin', adminLoginController);//working
driverRouter.post('/addDrivers', adminTokenValidator, addDriversController,);//frist driver


// driverRouter.post('/testing', testingController)//working
driverRouter.get('/getOrders/:phoneNo', getOrdersController);
driverRouter.post('/login', driverLoginController);//working
driverRouter.get('/getAllorders/:phoneNo', getAllOrdersController);
driverRouter.post('/updateAssignedOrders',
    driverTokenValidator,
    updateAssignedOrdersController);//working
// multiple queries for completed order
// petrol only
driverRouter.get('/getOnlyPetrol/:phoneNo', getOnlyPetrolController)

module.exports = driverRouter