const express = require('express');

async function registerController(req, res) {
    let userObj = req.body;
    console.log({ userObj });
    userDao.registerNewUser(userObj, res)
        .catch((err) => log.error(`Error in registering new user with username ${userObj.username}: ` + err));

}

module.exports = {
    registerController
}