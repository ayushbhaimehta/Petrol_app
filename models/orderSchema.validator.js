const Joi = require('joi');
const orderSchemaModel = require('./order.schemaModel');

const validateGetOrdersSchema = (newUser) => {
    return Joi.validate(newUser, orderSchemaModel.getAllOrdersSchemaModel);
}

module.exports = {
    validateGetOrdersSchema
}