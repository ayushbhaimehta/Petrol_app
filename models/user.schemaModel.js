const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerInputUserSchemaModel = {
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    phoneNo: Joi.string(),
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
    mongoUserSchema,
    registerInputUserSchemaModel
}