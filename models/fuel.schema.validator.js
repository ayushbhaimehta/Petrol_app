const Joi = require('joi');
const fuelSchemaModel = require('./fuel.schemaModel');

const validateFuelSchema = (fuelInfo) => {
    return Joi.validate(fuelInfo, fuelSchemaModel.addFuelSchemaModel);
}

// const validateGetAllCoupansSchema = (coupanInfo) => {
//     return Joi.validate(coupanInfo, coupanSchemaModel.getAllCoupanSchemaModel);
// }

module.exports = {
    validateFuelSchema,
    // validateGetAllCoupansSchema
}

validateFuelSchema