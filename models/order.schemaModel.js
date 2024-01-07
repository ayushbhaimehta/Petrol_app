const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('Order_SchemaModel');


const getAllOrdersSchemaModel = {
    phoneNo: Joi.string().min(10).max(10)
}

const addOrderSchemaModel = Joi.object({
    phoneNo: Joi.string().required(),
    order: Joi.object({
        fuelType: Joi.string().required(),
        fuelAmount: Joi.string().required(),
        emergency: Joi.boolean().required(),
        Date: Joi.date().iso().required(),
        Timing: Joi.string().required(),
        Coupan: Joi.object({
            coupanName: Joi.string().required(),
            discount: Joi.string().required(),
            minPrice: Joi.number().required(),
            MaxDiscount: Joi.string().required(),
        }),
        address: Joi.object({
            name: Joi.string().required(),
            phoneNo: Joi.string().required(),
            myself: Joi.boolean().required(),
            saveas: Joi.string().required(),
            fulladdr: Joi.string().required(),
            vehicle: Joi.string().required(),
            vnumber: Joi.string().required(),
        }),
    }).required(),
});


const mongoOrderSchema = new mongoose.Schema({
    phoneNo: String,
    order: [{
        fuelType: String,
        fuelAmount: String,
        emergency: Boolean,
        Date: Date,
        Timing: String,
        Coupan: {
            coupanName: String,
            discount: String,
            minPrice: Number,
            MaxDiscount: String
        },
        address: {
            name: String,
            phoneNo: String,
            myself: Boolean,
            saveas: String,
            fulladdr: String,
            vehicle: String,
            vnumber: String,
        }
    }],
});




const orderModel = mongoose.model('Order', mongoOrderSchema);
log.success(`order Schema model created`);

module.exports = {
    getAllOrdersSchemaModel,
    orderModel,
    addOrderSchemaModel
}