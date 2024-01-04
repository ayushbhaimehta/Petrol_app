const mongoose = require('mongoose');
const userSchema = require('../models/user.schemaModel');
const UserModel = mongoose.model('User', userSchema);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const dbUrl = config.get('mongodb-config.protocol') + config.get('mongodb-config.host') + config.get('mongodb-config.port') + config.get('mongodb-config.db');
mongoose.connect(dbUrl, {})
    .then(log.info('connected to mongo database....'))
    .catch(err => log.error('unable to connect, please check your connection....' + err));

//I have included this for dev puprose wil remember to comment it out before testing and final deployment
mongoose.connection.dropCollection('users', err => { if (err) log.error('Unable to drop user collections: ' + err) });

async function registerNewUser(userObj, response) {
    let newUser = new UserModel({
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        username: userObj.username,
        password: userObj.password,
        phoneNo: userObj.phoneNo,
        address: {
            firstline: userObj.address.firstline,
            secondline: userObj.address.secondline,
            city: userObj.address.city,
            country: userObj.address.country,
            pin: userObj.address.pin
        }
    });

    newUser.password = newUser.encryptPassword();

    await newUser.save((err, result) => {
        if (err) {
            return response.status(400).send({
                messageCode: new String(err.errmsg),
                message: 'Username' + userObj.username + 'already exists.'
            });
        };
        return response.send({
            message: 'You have been registered successfully.',
            username: result.username
        });
    });
}

module.exports = {
    registerNewUser
}