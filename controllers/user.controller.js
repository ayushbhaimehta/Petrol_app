const express = require('express');
const userValidator = require('../models/userSchema.validator');
const userDao = require('../Dao/user.dao');
const Logger = require('../logger/logger');
const log = new Logger('User_Controller');
const accountSid = "ACbffa96f58fed1305d2095c51452c17ff";
const authToken = "6d8c9c1dadcf73816c2fbefce03234f2";
const client = require("twilio")(accountSid, authToken);
const jwt = require('jsonwebtoken');

// const readline = require("readline");

async function registerNewUser(req, res) {
    let userObj = req.body;
    let { error } = userValidator.validateNewUserSchema(userObj);
    if (isNotValidSchema(error, res)) return;
    try {
        const response = await userDao.resgisterNewUser(userObj, res);
        return response;
    } catch (error) {
        log.error(`Error in registering new user with username ${userObj.username}: ` + error);
    }
}

const verifySid = "VA3b02c8ea4c1783a75cbdc761cc5199b2";
const secretKey = "123456789"
// client.verify.v2
//     .services(verifySid)
//     .verifications.create({ to: "+917879038278", channel: "sms" })
//     .then((verification) => console.log(verification.status, "flagger"))
//     .then(() => {
//         readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });
//         readline.question("Please enter the OTP:", (otpCode) => {
//             client.verify.v2
//                 .services(verifySid)
//                 .verificationChecks.create({ to: "+917879038278", code: otpCode })
//                 .then((verification_check) => console.log(verification_check.status))
//                 .then(() => readline.close());
//         });
//         // console.log({ readline });
//     });
async function sendOtpController(req, res) {
    const loginInfo = req.body;
    let { error } = userValidator.validateSendOtpSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    try {
        // send otp service
        const otpResponse = await client.verify.v2
            .services(verifySid)
            .verifications.create({
                to: `+${loginInfo.countryCode}${loginInfo.phoneNo}`,
                channel: 'sms',
            })
        console.log(otpResponse);
        log.info(`Sucessfully sent the otp to phoneNo ${loginInfo.phoneNo}`);
        res.status(200).send({
            message: 'Otp Sent to phoneNo' + loginInfo.phoneNo,
            result: otpResponse
        })
    } catch (error) {
        // error in sending the otp using twilio
        log.error(`Error in sending the otp using twilio for phone No ${loginInfo.phoneNo}`)
    }
}

async function verifyOtpController(req, res) {
    const loginInfo = req.body;
    const otp = loginInfo.OTP;
    console.log({ loginInfo });
    let { error } = userValidator.validateVerifyOtpSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    try {
        const verifiedResponse = await client.verify.v2.services(verifySid)
            .verificationChecks
            .create({ to: `${loginInfo.countryCode}${loginInfo.phoneNo}`, code: otp });
        // .create({ to: loginInfo.phoneNo, code: otp });
        console.log(verifiedResponse, "abc");
        if (verifiedResponse.status === 'approved') {
            log.info(`Successfully verified`);
            const jwtToken = jwt.sign({
                phoneNo: loginInfo.phoneNo,
            }, secretKey);
            res.header('x-auth-token', jwtToken).status(200).send({
                message: 'Otp verified',
                phoneNo: loginInfo.phoneNo
            })
        }
        else {
            res.status(400).send({
                message: 'Wrong otp entered'
            })
        }

    } catch (error) {
        log.error(`Error in verifing the otp`);
        res.status(404).send({
            message: 'Wrong otp'
        })
    }
}

async function getByPhoneNoController(req, res) {
    const loginInfo = req.params.phoneno;
    console.log(loginInfo);
    let { err } = userValidator.validateGetByPhoneNo(loginInfo, res);
    if (isNotValidSchema(err, res)) return;
    try {
        console.log("checkpoint2");
        const response = await userDao.getByPhoneNo(loginInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in getting userdata by this phone No ${loginInfo.phoneno}` + error);
    }
}

async function updateAddress(req, res) {
    const loginInfo = req.body;
    let { err } = userValidator.validateUpdateAddressSchema(loginInfo, res);
    if (isNotValidSchema(err, res)) return;
    try {
        console.log("checkpoint 2");
        const response = await userDao.updateAddressDao(loginInfo, res);
        // log.info(`Successfully updated the address`)
        return response;
    } catch (error) {
        log.error(`Error in finding the user` + error)
    }
}

async function addAdressController(req, res) {
    const loginInfo = req.body;
    let { err } = userValidator.validateAddaddressSchema(loginInfo, res);
    if (isNotValidSchema(err, res)) return;
    try {
        console.log("checkpoint 1");
        const result = await userDao.addAddressDao(loginInfo, res);
        return result;
    } catch (error) {
        log.error(`Error in adding new address ` + error)
    }
}

async function updatePhoneController(req, res) {
    const loginInfo = req.body;
    console.log(loginInfo);
    let { err } = userValidator.ValidatorUpdatePhoneSchema(loginInfo, res);
    if (isNotValidSchema(err, res)) return;
    try {
        console.log("checkpoint2");
        const response = await userDao.updatePhoneNo(loginInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in getting data for phone number ${loginInfo.phoneNo}` + error)
    }
}

async function getByUsernameController(req, res) {
    console.log({ req });
    const loginInfo = req.params.username;
    console.log(loginInfo);
    let { err } = userValidator.validateGetUsernameSchema(loginInfo, res);
    console.log(" checkpoint");
    if (isNotValidSchema(err, res)) return;
    try {
        const response = await userDao.getByUsername(loginInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in getting userdata by this username${loginInfo.username} ` + error)
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
    registerNewUser,
    loginController,
    getByUsernameController,
    getByPhoneNoController,
    updatePhoneController,
    updateAddress,
    sendOtpController,
    verifyOtpController,
    addAdressController
};