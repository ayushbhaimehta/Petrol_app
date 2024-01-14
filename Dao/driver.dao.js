const Logger = require('../logger/logger');
const log = new Logger('Driver_Dao');
const { DriverModel } = require('../models/driverSchema');

const secretKey = "12345";

async function driverLoginDao(driverInfo, res) {
    console.log({ driverInfo });
    const username = driverInfo.username;
    const password = driverInfo.password;

    const result = await DriverModel.findOne({ username: username },
        (err, response) => {
            if (err || !response) {
                log.error(`error in finding the username` + err);
                res.status(404).send({
                    message: 'error in logging in!'
                })
            }
            if (response.password !== password) {
                log.info(`Incorrect password`);
                return res.status(400).send({
                    message: 'incorrect password'
                })
            }
            return res.status(200).send({
                message: 'Logged In successfully!',
                result: response
            })
        })
    return result;
}

async function addDriversDao(driverInfo, res) {

    console.log({ driverInfo }, " dao layer entered");
    const phoneNo = driverInfo.phoneNo;

    await DriverModel.findOne({ phoneNo: phoneNo }, (err, response) => {
        if (!err || response) {
            return res.status(409).send({
                message: 'driver already exists with this phoneNo',
                result: response
            })
        }
        else {
            let newDriver = new DriverModel({
                name: driverInfo.name,
                username: driverInfo.username,
                password: driverInfo.password,
                phoneNo: phoneNo,
                assignedOrders: [{ _orderId: driverInfo.assignedOrders._orderId, }],
            })
            console.log({ newDriver });
            async function registerNewUser() {
                const result = await newDriver.save((err, response) => {
                    if (err || !response) {
                        log.error(`Error in saving mongoose querry` + err);
                        return res.status(500).send({
                            message: 'error in saving driver info in db'
                        })
                    }
                    log.info(`Successfully saved the driver info in the db`);
                    return res.send({
                        message: 'Successfully saved the data in db'
                    })
                })
                return result;
            }
            registerNewUser();
        }
    })
}

module.exports = {
    addDriversDao,
    driverLoginDao
}