const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('Driver_SchemaModel');

const addDriversSchemaModel = {
    username: Joi.string(),
    password: Joi.string(),
    name: Joi.string(),
    phoneNo: Joi.string(),
    assignedOrders: {
        _orderId: Joi.string(),
    }
}

const getOrdersSchemaModel = {
    phoneNo: Joi.string()
}

const adminLoginSchemaModel = {
    username: Joi.string(),
    password: Joi.string()
}

const driverLoginSchemaModel = {
    username: Joi.string(),
    password: Joi.string()
}

const mongoDriverSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    phoneNo: String,
    assignedOrders: [
        {
            _orderId: String,
        }
        //orderIDs
    ],
});

const DriverModel = mongoose.model('Driver', mongoDriverSchema);
log.warn(`Driver Schema model created`);


module.exports = {
    addDriversSchemaModel,
    DriverModel,
    driverLoginSchemaModel,
    getOrdersSchemaModel,
    adminLoginSchemaModel
}