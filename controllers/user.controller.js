const express = require('express');
const userValidator = require('../models/userSchema.validator');
const userDao = require('../Dao/user.dao');
const Logger = require('../logger/logger');
const log = new Logger('User_Controller');

async function registerNewUser(req, res) {
    let userObj = req.body;
    let { error } = userValidator.validateNewUserSchema(userObj);
    if (isNotValidSchema(error, res)) return;
    try {
        const response = await userDao.resgisterNewUser(userObj, res);
        return response;
    } catch (error) {
        log.error(`Error in registering new user with username ${userObj.username}: ` + err);
    }
}

async function loginController(req, res) {
    // console.log({ req });
    let loginInfo = req.body;
    let { error } = userValidator.validateLoginUserSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    try {
        const response = await userDao.validateLoginUser(loginInfo, res);
        return response;
    } catch (error) {
        log.error(`Error in login for username ${loginInfo.username}: ` + err);
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
    updatePhoneController
};