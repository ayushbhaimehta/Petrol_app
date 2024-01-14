const Logger = require('../logger/logger');
const log = new Logger('Driver_Controller');
const driverValidator = require('../models/driver.validatorSchema');
const driverDao = require('../Dao/driver.dao')
const nodemailer = require("nodemailer");
require('dotenv').config();
// const jwt = require('jsonwebtoken');

async function testingController(req, res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
    let mailOptions = {
        from: "ayushbhaimehta20002@gmail.com",
        to: "ayushmehta0620@gmail.com",
        subject: 'petrol testing',
        text: 'Hi Ayush daddy is home'
    };
    transporter.senAdMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
            return res.status(403);
        } else {
            console.log(data);
            console.log("Email sent successfully");
            return res.status(200).send({});
        }
    });
}

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
    testingController,
    driverLoginController
};