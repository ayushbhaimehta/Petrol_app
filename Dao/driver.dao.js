const Logger = require('../logger/logger');
const log = new Logger('Driver_Dao');
const { DriverModel } = require('../models/driverSchema');

const secretKey = "12345"

async function addDriversDao(driverInfo, res) {

    console.log({ driverInfo }, " dao layer entered");
    const phoneNo = driverInfo.phoneNo;

    // if driver info is not there is db
    // new drivers 
    let newDriver = new DriverModel({
        name: driverInfo.name,
        phoneNo: phoneNo,
        assignedOrders: [
            {
                _orderId: driverInfo.assignedOrders._orderId,
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