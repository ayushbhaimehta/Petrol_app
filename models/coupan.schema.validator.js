const Joi = require('joi');
const coupanSchemaModel = require('./coupan.schemaModel');

const validateAddCoupanSchema = (coupanInfo) => {
    return Joi.validate(coupanInfo, coupanSchemaModel.addCoupanSchemaModel);
}

module.exports = {
    validateAddCoupanSchema
}