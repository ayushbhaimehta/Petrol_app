const Logger = require('../logger/logger');
const log = new Logger('Driver_Dao');
const { DriverModel } = require('../models/driverSchema');
const { orderModel } = require('../models/order.schemaModel');
const bcrypt = require('bcrypt');

const secretKey = "12345";

async function adminLoginDao(driverInfo, res) {
    const username = driverInfo.username;
    const password = driverInfo.password;

    const result = await DriverModel.findOne({ username: username },
        async (err, response) => {
            if (err || !response) {
                log.error(`error in finding the username` + err);
                res.status(404).send({
                    message: 'error in logging in!'
                })
            }
            const isPasswordCorrect = await bcrypt.compare(password, response.password);
            if (!isPasswordCorrect) {
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

async function driverLoginDao(driverInfo, res) {
    console.log({ driverInfo });
    const username = driverInfo.username;
    const password = driverInfo.password;

    const result = await DriverModel.findOne({ username: username },
        async (err, response) => {
            if (err || !response) {
                log.error(`error in finding the username` + err);
                res.status(404).send({
                    message: 'error in logging in!'
                })
            }
            const isPasswordCorrect = await bcrypt.compare(password, response.password);
            if (!isPasswordCorrect) {
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

async function updateDriverDao(driverInfo, res) {
    console.log("check 2");
    const phoneNo = driverInfo.phoneNo;
    const _orderId = driverInfo._orderId;
    const payload = await DriverModel.findOne({ phoneNo: phoneNo },
        async (err, response) => {
            if (err || !response) {
                log.error(`Cannot find a driver with this phoneNo` + err);
                return res.status(404).send({
                    message: 'Can not find a driver with this phoneNo'
                })
            }
        })
    console.log({ payload });
    // const adrArray = payload.address;
    const temp = {
        _orderId: _orderId
    }
    payload.assignedOrders.push(temp);
    // console.log(payload);
    const array = payload.assignedOrders;
    console.log({ array });
    const result = await DriverModel.findOneAndUpdate(
        { phoneNo: phoneNo },
        { assignedOrders: payload.assignedOrders },
        (err, response) => {
            console.log("updatePoint");
            if (err || !response) {
                log.error(`Error in adding new order to a driver` + err);
                return res.status(400).send({
                    message: 'Error in adding new order to a driver'
                })
            }
            log.info(`Sucessfully added new order to phoneNo ${phoneNo}`);
            // console.log(res);
            return res.status(200).send({
                message: 'Successfully added new order',
            })
        })
    return result;
}

async function getPetrolDao(driverInfo, res) {
    const phoneNo = driverInfo;
    const result = await DriverModel.findOne({
        phoneNo: phoneNo,
    }, async (err, response) => {
        if (err || !response) {
            log.error(`error in the querry of get orders dao` + err);
            return res.status(404).send({
                message: 'error in fetching orders'
            })
        } else {
            // use a loop and usegetbyid function
            const array = response.assignedOrders;
            // console.log({ array });
            const finalArray = [];
            for (let i = 0; i < array.length; i++) {
                const _orderId = response.assignedOrders[i]._orderId;
                await orderModel.findOne(
                    {
                        'order._id': _orderId
                    },
                    (e, payload) => {
                        // console.log("checkpoint3");
                        if (e || !payload) {
                            console.log({ payload });
                            // log.error(`Error in finding ` + e);
                            return res.status(404).send({
                                message: 'No order' + 'found'
                            })
                        }
                        let temp;
                        for (let i = 0; i < payload.order.length; i++) {
                            if (payload.order[i]._id == _orderId &&
                                payload.order[i].fuelType == 'petrol') {
                                temp = payload.order[i];
                                break;
                            }
                        }
                        console.log(temp);
                        if (temp) {
                            finalArray.push(temp)
                        }
                        // finalArray.push(temp)
                    })
            }
            console.log({ finalArray });
            log.info(`successfully fetched orders for the driver with phoneNO ${phoneNo}`);
            return res.status(200).send({
                message: 'Successfully fetched all orders',
                result: finalArray
            })
        }

    })
    return result;
}

async function getAllOrdersDao(driverInfo, res) {
    const result = await DriverModel.find({}, (err, response) => {
        if (err || !response) {
            log.error(`error in the querry of get orders dao` + err);
            return res.status(404).send({
                message: 'error in fetching orders'
            })
        }
        log.info(`successfully fetched orders for all drivers`);
        return res.status(200).send({
            message: 'Successfully fetched all orders',
            result: response
        })
    })
    return result;
}

async function getordersDao(driverInfo, res) {
    const phoneNo = driverInfo;
    const result = await DriverModel.findOne({ phoneNo: phoneNo }, (err, response) => {
        if (err || !response) {
            log.error(`error in the querry of get orders dao` + err);
            return res.status(404).send({
                message: 'error in fetching orders'
            })
        }
        log.info(`successfully fetched orders for the driver with phoneNO ${phoneNo}`);
        return res.status(200).send({
            message: 'Successfully fetched all orders',
            result: response
        })
    })
    return result;
}

async function addDriversDao(driverInfo, res) {

    console.log({ driverInfo }, " dao layer entered");
    const phoneNo = driverInfo.phoneNo;

    await DriverModel.findOne({ phoneNo: phoneNo }, async (err, response) => {
        if (err || !response) {
            let newDriver = new DriverModel({
                name: driverInfo.name,
                username: driverInfo.username,
                password: driverInfo.password,
                phoneNo: phoneNo,
                assignedOrders: [{ _orderId: driverInfo.assignedOrders._orderId, }],
            })
            newDriver.password = await bcrypt.hash(driverInfo.password, 12);
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
        else {
            return res.status(409).send({
                message: 'driver already exists with this phoneNo',
                result: response
            })
        }
    })
}

module.exports = {
    addDriversDao,
    driverLoginDao,
    getordersDao,
    getAllOrdersDao,
    adminLoginDao,
    updateDriverDao,
    getPetrolDao
}