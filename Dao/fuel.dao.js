const Logger = require('../logger/logger');
const log = new Logger('Coupan_Dao');
// const { orderModel } = require('../models/order.schemaModel')
// const { UserModel } = require('../models/user.schemaModel')
const { FuelModel } = require('../models/fuel.schemaModel');

const secretKey = "12345"

async function getAllCoupansDao(coupanInfo, res) {
    log.success('dao layer entered');
    console.log({ coupanInfo });
    // const response = await getFunction(phoneNo);
    // console.log({ response });
    return await CoupanModel.find({}, (err, response) => {
        log.success('dao querry layer entered');
        if (err || !response) {
            log.error(`failed in the query in dao layer ` + err);
            return res.status(404).send({
                message: 'Cannot find any coupans with given phoneNo '
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

async function addFuelDao(fuelInfo, res) {
    console.log({ fuelInfo });
    let newFuel = new FuelModel({
        "petrol": fuelInfo.petrol,
        "diesel": fuelInfo.diesel,
        "premium": fuelInfo.premium
    });

    const result = await newFuel.save((err, response) => {
        console.log("save querry entered");
        if (err || !response) {
            log.error(`Error in adding new fuel ` + err);
            return res.status(500).send({
                message: 'error in adding new fuels'
            })
        }
        log.blink('New fuel has been added to the db');
        return res.status(200).send({
            message: 'New fuel has successfully added'
        })
    })
    return result;

}

module.exports = {
    addFuelDao,
    // getAllCoupansDao
}