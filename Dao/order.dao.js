const Logger = require('../logger/logger');
const log = new Logger('User_Dao');
const { orderModel } = require('../models/order.schemaModel')

const secretKey = "12345"

async function getAllOrdersDao(loginInfo, res) {
    console.log({ loginInfo });
    res.send({ message: 'testing mode' })
}

module.exports = {
    getAllOrdersDao
}