const Joi = require('joi');
const driverSchemaModel = require('./driverSchema');

const validateAddDriversSchema = (driverinfo) => {
    return Joi.validate(driverinfo, driverSchemaModel.addDriversSchemaModel);
}

module.exports = {
    validateAddDriversSchema,
}