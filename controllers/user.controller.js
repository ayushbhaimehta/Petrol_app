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
    loginController
};