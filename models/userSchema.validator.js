const Joi = require('joi');
const userSchemaModel = require('./user.schemaModel');

const validateNewUserSchema = (newUser) => {
    return Joi.validate(newUser, userSchemaModel.registerInputUserSchemaModel);
}

const validateLoginUserSchema = (user) => {
    return Joi.validate(user, userSchemaModel.loginSchemaModel);
}

module.exports = {
    validateNewUserSchema,
    validateLoginUserSchema
}