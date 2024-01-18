const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('dbCollection_SchemaModel');

const addDateSchema = {
    date: Joi.date(),
    // slots: {
    //     '12-1': Joi.string(),
    //     '1-2': Joi.string(),
    //     '2-3': Joi.string(),
    //     '3-4': Joi.string(),
    //     '4-5': Joi.string(),
    //     '5-6': Joi.string(),
    //     '6-7': Joi.string(),
    //     '7-8': Joi.string()
    // }
}

const mongoDbCollectionSchema = new mongoose.Schema({
    date: Date,
    slots: {
        '12-1': String,
        '1-2': String,
        '2-3': String,
        '3-4': String,
        '4-5': String,
        '5-6': String,
        '6-7': String,
        '7-8': String
    }
});

const validateaddDateSchema = (dateInfo) => {
    return Joi.validate(dateInfo, addDateSchema);
}

const dbCollectionModel = mongoose.model('dbCollection', mongoDbCollectionSchema);

module.exports = {
    dbCollectionModel,
    addDateSchema,
    validateaddDateSchema
}