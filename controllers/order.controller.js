const express = require('express');
const orderValidator = require('../models/orderSchema.validator');
const Logger = require('../logger/logger');
const log = new Logger('Order_Controller');
const orderDao = require('../Dao/order.dao')
// const { UserModel } = require('../models/user.schemaModel')
const jwt = require('jsonwebtoken');


async function getAllOrdersController(req, res) {
    console.log("controller checkpoint");
    const loginInfo = req.params;
    console.log({ loginInfo });
    let { error } = orderValidator.validateGetOrdersSchema(loginInfo, res);
    if (isNotValidSchema(error, res)) return;
    try {
        console.log(" Dao entering checkpoint");
        const response = await orderDao.getAllOrdersDao(loginInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in getting orders by the phone no ${loginInfo.phoneNo}` + error)
    }
}

function isNotValidSchema(error, res) {
    if (error) {
        log.error(`Schema validation error:${error.details[0].message}`);
        res.status(400).send({
            message: error.details[0].message
        });
        return true;
    }
    return false;
}

module.exports = {
    getAllOrdersController
};