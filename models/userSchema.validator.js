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

const ValidatorUpdatePhoneSchema = (payload) => {
    console.log("flagger");
    return Joi.validate(payload, userSchemaModel.updatePhoneSchemaModel)
}

const validateGetByPhoneNo = (phoneNo) => {
    console.log("Checkker");
    return Joi.validate(phoneNo, userSchemaModel.getByPhoneNoSchema);
}

const validateUpdateAddressSchema = (loginInfo) => {
    console.log("flagger");
    return Joi.validate(loginInfo, userSchemaModel.updateAddressSchemaModel)
}

module.exports = {
    validateNewUserSchema,
    validateLoginUserSchema,
    validateGetUsernameSchema,
    validateGetByPhoneNo,
    ValidatorUpdatePhoneSchema,
    validateUpdateAddressSchema
}