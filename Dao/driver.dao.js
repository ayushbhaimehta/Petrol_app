const Logger = require('../logger/logger');
const log = new Logger('Driver_Dao');
const { DriverModel } = require('../models/driverSchema');

const secretKey = "12345"

async function getAllCoupansDao(driverInfo, res) {
    log.success('dao layer entered');
    console.log({ coupanInfo });
    const phoneNo = coupanInfo.phoneNo;
    // const response = await getFunction(phoneNo);
    // console.log({ response });
    return await CoupanModel.find({ phoneNo: phoneNo }, (err, response) => {
        log.success('dao querry layer entered');
        if (err || !response) {
            log.error(`failed in the query in dao layer ` + err);
            return res.status(404).send({
                message: 'Cannot find any coupans with given phoneNo ' + phoneNo
            })
        }
        console.log({ response });
        log.success('Successfully fetched all the coupans with given phoen no');
        res.status(200).send({
            message: 'Successfully fetched all the coupans',
            result: response
        })
    })
}

async function addDriversDao(driverInfo, res) {

    console.log({ driverInfo }, " dao layer entered");
    const phoneNo = driverInfo.phoneNo;

    let newDriver = new DriverModel({
        name: driverInfo.name,
        phoneNo: phoneNo,
        assignedOrders: [
            {
                _orderId: driverInfo._orderId,
            }
            //orderIDs
        ],
        earned: driverInfo.earned,
        workedTime: driverInfo.workedTime
    })

    console.log({ newDriver });

    const result = await newDriver.save((err, response) => {
        if (err || !response) {
            log.error(`Error in saving mongoose querry` + err);
            return res.status(500).send({
                message: 'error in saving driver info in db'
            })
        }
        log.info(`Successfully saved the driver info in the db`);
        return res.status(200).send({
            message: 'Successfully saved the data in db'
        })
    })
    return result;
    // console.log({ payload });
    // res.status(200).send({
    //     message: 'Testing phase'
    // })
}

module.exports = {
    addDriversDao
}