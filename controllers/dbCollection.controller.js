const { validateaddDateSchema, dbCollectionModel } = require('../models/dbCollection.schemaModel');
const Logger = require('../logger/logger');
const log = new Logger('dbCollection_Controller');

async function orderCountController(req, res) {
    // const dateInfo = req.body;
    let dateInfo = new Date();
    // const today = dateInfo.substring(0, 10);
    let dateT = dateInfo;
    let year = dateT.getFullYear();
    let month = dateT.getMonth() + 1;
    let dt = dateT.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let today = year + '-' + month + '-' + dt;
    console.log({ today });
    dateInfo.setDate(dateInfo.getDate() - 1);

    let dateY = dateInfo;
    let year2 = dateY.getFullYear();
    let month2 = dateY.getMonth() + 1;
    let dt2 = dateY.getDate();

    if (dt2 < 10) {
        dt2 = '0' + dt2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    let yesterday = year2 + '-' + month2 + '-' + dt2;
    console.log({ yesterday });

    // let { error } = validateaddDateSchema(dateInfo, res);
    // if (isNotValidSchema(error, res)) return;
    try {
        // await dbCollectionModel
        return;
    } catch (error) {
        log.error(`Error in adding new fuel` + error);
    }
}

async function getAllfuelsController(req, res) {
    log.info('controller entered');
    const fuelInfo = req.params.phoneNo;
    try {
        const result = await fuelDao.getAllfuels(fuelInfo, res);
        return result;
    } catch (error) {
        log.error(`Error in Dao trycatch layer ` + error)
    }
}

async function updateFuelController(req, res) {
    const fuelInfo = req.body;
    let { error } = FuelValidator.validateUpdateFuelSchema(fuelInfo, res);
    console.log("check");
    if (isNotValidSchema(error, res)) return;
    try {
        console.log("validation and schema done");
        const result = await fuelDao.updateFuelDao(fuelInfo, res);
        return result;
    } catch (error) {
        log.error(`Error in updating user details` + error);
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
    getAllfuelsController,
    updateFuelController,
    orderCountController
};