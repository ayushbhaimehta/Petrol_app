const Logger = require('../logger/logger');
const log = new Logger('User_Dao');
const { UserModel } = require('../models/user.schemaModel')
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const secretKey = "12345"



//I have included this for dev puprose wil remember to comment it out before testing and final deployment
// mongoose.connection.dropCollection('users', err => { if (err) log.error('Unable to drop user collections: ' + err) });


async function getByUsername(loginInfo, response) {
    const username = loginInfo;

    await UserModel.findOne({ username: username }, (err, res) => {
        if (err || !res) {
            log.error(`Error in finding user with username ${username}` + err);
            return response.status(404).send({
                username: username,
                message: 'No user with username ' + username
            });
        }

        log.info(`Foudn a user with data ${res.username}`);
        return response.status(200).send({
            // username: username,
            phoneNo: res.phoneNo,
            result: res,
            message: 'Found a user with username ' + username
        })
    })
}

async function resgisterNewUser(userObj, response) {
    console.log({ userObj });
    console.log(userObj.address[0]);
    const ind = userObj.address.length;
    console.log(ind, "array size");
    const phoneNo = userObj.phoneNo;
    console.log(phoneNo);
    const existingUser = await UserModel.findOne({ phoneNo: phoneNo });
    if (existingUser) {
        log.info(`User already found. LoggedIn successfully`);
        console.log({ existingUser });
        return response.status(203).send({
            message: 'You have successfully loggedIn',
            // result: existingUser
        });
    }

    let newUser = new UserModel({
        name: userObj.name,
        username: userObj.username,
        phoneNo: userObj.phoneNo,
        address: [{
            name: userObj.address[ind - 1].name,
            phoneNo: userObj.address[ind - 1].phoneNo,
            myself: userObj.address[ind - 1].myself,
            saveas: userObj.address[ind - 1].saveas,
            fulladdr: userObj.address[ind - 1].fulladdr,
            vehicle: userObj.address[ind - 1].vehicle,
            vnumber: userObj.address[ind - 1].vnumber
        }]
    });

    const result = await newUser.save((err, result) => {
        if (err) {
            log.error(`Error in registering new user with username ${userObj.phoneNo}: ` + err);
            return response.status(202).send({
                messageCode: new String(err.errmsg).split(" ")[0],
                message: 'phoneNo ' + userObj.phoneNo + ' already exists.'
            });
        };
        log.info(result.phoneNo + ' has been registered');
        return response.status(200).send({
            message: 'You have been registered successfully.',
            phoneNo: result.phoneNo
        });
    });
    return result;
}

async function getByPhoneNo(loginInfo, res) {
    const phoneNo = loginInfo;
    console.log({ phoneNo });
    await UserModel.findOne({ phoneNo: phoneNo }, (err, response) => {
        console.log("checkpoint3");
        if (err || !response) {
            log.error(`Error in finding phoneNo ${phoneNo}` + err);
            return res.status(404).send({
                phoneNo: phoneNo,
                message: 'No user with this ' + phoneNo + 'found'
            })
        }
        log.info(`Found a user with phone No ${phoneNo}`);
        return res.status(200).send({
            result: response,
            message: `FOund a user with phoneno ${phoneNo}`
        })
    })
}

async function updateAddressDao(loginInfo, res) {
    const address = loginInfo.address;
    const phoneNo = loginInfo.phoneNo;

    await UserModel.findOneAndUpdate({ phoneNo: phoneNo }, { address, address }, (err, response) => {
        if (err || !response) {
            log.error(`Error in retrieving the data for the username ${username}` + err);
            return res.status(400).send({
                message: 'Error in updating the address',
                phoneNo: phoneNo
            })
        }
        log.info(`Found and successfully updated the phoneNo for the user ${phoneNo} from prev address ${response.address} to new address ${address}`);
        return res.status(200).send({
            message: `Successfully the address from ${response.address} to new address ${address}`,
            result: response
        })
    })
}

async function addAddressDao(loginInfo, res) {

}

async function updatePhoneNo(loginInfo, res) {
    const phoneNo = loginInfo.phoneNo;
    const newPhoneNo = loginInfo.newPhoneNo;
    console.log({ phoneNo }, "moment of truth flag");
    await UserModel.findOneAndUpdate({ phoneNo: phoneNo }, { phoneNo: newPhoneNo }, (err, response) => {
        console.log("updatePoint");
        if (err || !response) {
            log.error(`Error while updating the phone No ${phoneNo}`);
            return res.status(404).send({
                message: 'Error in updating the phoneNo',
                phoneNo: phoneNo
            })
        }
        log.info(`Successfully updated the phoneNo from ${phoneNo} to ${newPhoneNo}`);
        return res.status(200).send({
            message: `updated the phoneNo from ${phoneNo} to ${newPhoneNo}`,
            phoneNo: newPhoneNo
        })

    });
}
async function validateLoginUser(loginInfo, response) {
    const username = loginInfo.username;
    await UserModel.findOne({ username: username }, (err, result) => {
        if (err || !result) {
            log.error(`Error in finding user with username ${username}:` + err);
            return response.status(400).send({
                username: loginInfo.username,
                message: 'No user with username' + username
            });
        }
        // const dbPassword = result.password;

        // if (result && bcrypt.compareSync(password, dbPassword)) {
        //     log.info(username + ' has been validated and loggedin');
        //     const jwtToken = jwt.sign({
        //         exp: Math.floor(Date.now() / 1000) + (60),
        //         username: username,
        //     }, secretKey);

        //     return response.header('x-auth-token', jwtToken).send({
        //         username: username,
        //         message: 'Valid credential.'
        //     });
        // }
        // else {
        //     log.warn('Unable to validate for' + username);
        //     return response.status(404).send({
        //         username: username,
        //         message: 'password wrong.'
        //     });
        // }
    });
}



module.exports = {
    resgisterNewUser,
    validateLoginUser,
    getByUsername,
    getByPhoneNo,
    updatePhoneNo,
    updateAddressDao,
    addAddressDao
}