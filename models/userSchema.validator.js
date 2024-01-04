const Joi = require('joi');
const userSchemaModel = require('./user.schemaModel');

const validateNewUserSchema = (newUser) => {
    return Joi.validate(newUser, userSchemaModel.registerInputUserSchemaModel);
}

const validateLoginUserSchema = (user) => {
    return Joi.validate(user, userSchemaModel.loginSchemaModel);
}

const validateGetUsernameSchema = (username) => {
    console.log("flag");
    return Joi.validate(username, userSchemaModel.getByUsernameSchema);
}

const validateGetByPhoneNo = (phoneNo) => {
    console.log("Checkker");
    return Joi.validate(phoneNo, userSchemaModel.getByPhoneNoSchema);
}

module.exports = {
    validateNewUserSchema,
    validateLoginUserSchema,
    validateGetUsernameSchema
}