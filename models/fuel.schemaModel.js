const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('Fuel_SchemaModel');

const addFuelSchemaModel = {
    petrol: Joi.string(),
    diesel: Joi.string(),
    premium: Joi.string()
}

const mongoFuelSchema = new mongoose.Schema({
    petrol: String,
    diesel: String,
    premium: String
});

const FuelModel = mongoose.model('Fuel', mongoFuelSchema);
log.success(`Fuel Schema model created`);


module.exports = {
    FuelModel,
    addFuelSchemaModel,
    // getAllCoupanSchemaModel,
}