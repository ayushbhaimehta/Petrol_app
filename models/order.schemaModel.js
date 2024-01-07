const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('Order_SchemaModel');


const getAllOrdersSchemaModel = {
    phoneNo: Joi.string().min(10).max(10)
}

const mongoOrderSchema = new mongoose.Schema({
    phoneNo: String,
    fuelType: String,
    fuelAmount: String,
    emergency: Boolean,
    Date: Date,
    Timing: String,
    Coupan: {
        discount: String,
        minPrice: Number,
        MaxDiscount: Number
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

});

const orderModel = mongoose.model('Order', mongoOrderSchema);


module.exports = {
    getAllOrdersSchemaModel,
    orderModel
}