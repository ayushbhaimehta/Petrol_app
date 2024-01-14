const Logger = require('../logger/logger');
const log = new Logger('Driver_Controller');
const driverValidator = require('../models/driver.validatorSchema');
const driverDao = require('../Dao/driver.dao')
const nodemailer = require("nodemailer");
require('dotenv').config();
// const jwt = require('jsonwebtoken');

async function driverLoginController(req, res) {
    const driverInfo = req.body;
    let { err } = driverValidator.validateLoginDriverSchema(driverInfo, res);
    // console.log("check");
    if (isNotValidSchema(err, res)) return;

    try {
        const result = await driverDao.driverLoginDao(driverInfo, res);
        return result;
    } catch (error) {
        log.error(`Error in loggin in the driver`);
    }
}

async function getOrdersController(req, res) {
    const driverInfo = req.params;
    let { error } = driverValidator.validateGetOrdersSchema(driverInfo, res);
    if (isNotValidSchema(error, res)) return;

    try {
        const result = await driverDao.getordersDao(driverInfo, res);
        return result;
    } catch (error) {
        log.error(`Error in the getorderscontroller`);
        return res.status(400).send({});
    }
}

async function addDriversController(req, res) {
    console.log("abcc");
    const driverInfo = req.body;
    console.log({ driverInfo });
    let { error } = driverValidator.validateAddDriversSchema(driverInfo, res);
    console.log("check");
    if (isNotValidSchema(error, res)) return;
    // console.log("check2");
    try {
        console.log("check3");
        const response = await driverDao.addDriversDao(driverInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in adding new order for phoneNO ${driverInfo.phoneNo}` + error)
    }
    // return res.send("testing")
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
    addDriversController,
    driverLoginController,
    getOrdersController
};