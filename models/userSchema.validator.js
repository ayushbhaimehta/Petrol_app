const Joi = require('joi');
const userSchemaModel = require('./user.schemaModel');

const validateNewUserSchema = (newUser) => {
    return Joi.validate(newUser, userSchemaModel.registerInputUserSchemaModel);
}

module.exports = {
    validateNewUserSchema
}