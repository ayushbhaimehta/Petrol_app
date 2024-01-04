const Logger = require('../logger/logger');
const log = new Logger('User_Dao');
const mongoose = require('mongoose');
const userSchema = require('../models/user.schemaModel').mongoUserSchema;
const UserModel = mongoose.model('User', userSchema);
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dbUrl = "mongodb+srv://ayush:ayush@mctservertests.4w9lbwd.mongodb.net/";

try {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(log.info('connected to mongo database....'));
} catch (error) {
    log.error('unable to connect, please check your connection....' + error)
}


//I have included this for dev puprose wil remember to comment it out before testing and final deployment
// mongoose.connection.dropCollection('users', err => { if (err) log.error('Unable to drop user collections: ' + err) });


async function resgisterNewUser(userObj, response) {
    let newUser = new UserModel({
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        emailId: userObj.emailId,
        dateOfBirth: new Date(userObj.dateOfBirth),
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
            log.error(`Error in registering new user with username ${userObj.username}: ` + err);
            return response.status(400).send({
                messageCode: new String(err.errmsg).split(" ")[0],
                message: 'Username ' + userObj.username + ' already exists.'
            });
        };
        log.info(result.username + ' has been registered');
        return response.send({
            messageCode: 'USRR',
            message: 'You have been registered successfully.',
            username: result.username
        });
    });
}

module.exports = {
    resgisterNewUser,
}