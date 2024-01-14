const express = require('express');
const {
    createFuelController,
    getAllfuelsController,
    updateFuelController
} = require('../controllers/fuel.controller')

const fuelRouter = express.Router();

fuelRouter.get('/getfuelprices/:phoneNo', getAllfuelsController);//working
fuelRouter.post('/createFuel', createFuelController);//working
fuelRouter.post('/updateFuel', updateFuelController);//working


module.exports = fuelRouter;