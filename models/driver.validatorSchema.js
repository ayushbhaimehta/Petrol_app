const Joi = require('joi');
const driverSchemaModel = require('./driverSchema');

const validateAddDriversSchema = (driverinfo) => {
    console.log("validation check");
    return Joi.validate(driverinfo, driverSchemaModel.addDriversSchemaModel);
}

const validateLoginDriverSchema = (driverinfo) => {
    return Joi.validate(driverinfo, driverSchemaModel.driverLoginSchemaModel);
}

module.exports = {
    validateAddDriversSchema,
    validateLoginDriverSchema
}