const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('Driver_SchemaModel');

const addDriversSchemaModel = {
    name: Joi.string(),
    phoneNo: Joi.string(),
    assignedOrders: Joi.array().items(Joi.object({
        _orderId: Joi.string(),
    })),
    earned: Joi.string(),
    workedTime: Joi.string()
}

const mongoDriverSchema = new mongoose.Schema({
    name: String,
    phoneNo: String,
    assignedOrders: [
        {
            _orderId: String,
        }
        //orderIDs
    ],
    earned: String,
    workedTime: String
});

const DriverModel = mongoose.model('Driver', mongoDriverSchema);
log.warn(`Driver Schema model created`);


module.exports = {
    addDriversSchemaModel,
    DriverModel
}