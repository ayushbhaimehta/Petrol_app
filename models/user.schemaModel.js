const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('User_SchemaModel');
const bcrypt = require('bcrypt');


const registerInputUserSchemaModel = {
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    phoneNo: Joi.string().max(10).required(),
    address: {
        firstline: Joi.string(),
        secondline: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
        pin: Joi.string()
    },
}


const mongoUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    password: String,
    phoneNo: String,
    address: {
        firstline: String,
        secondline: String,
        city: String,
        country: String,
        pin: String
    }
});

mongoUserSchema.methods.encryptPassword = function () {
    return bcrypt.hashSync(this.password, 10, (err) => {
        if (err) {
            log.error('Unable to ecrypt password: ' + err);
        }
    });
}

module.exports = {
    registerInputUserSchemaModel,
    mongoUserSchema
}