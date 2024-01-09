const Logger = require('../logger/logger');
const log = new Logger('User_Dao');
const { orderModel } = require('../models/order.schemaModel')
const { UserModel } = require('../models/user.schemaModel')

const secretKey = "12345"

async function getAllOrdersDao(loginInfo, res) {
    console.log({ loginInfo });
    res.send({ message: 'testing mode' })
}
async function phoneExists(orderInfo) {
    return await UserModel.findOne({ phoneNo: orderInfo.phoneNo });
}

async function addOrderDao(orderInfo, res) {
    console.log({ orderInfo });
    const payload = await phoneExists(orderInfo);
    // phone does not exists then throw error
    if (!payload) {
        res.status(404).send({
            message: 'Cant find the user with phoneNo' + orderInfo.phoneNo
        })
    }


    //check for address
    const reqAdr = orderInfo.addressId;
    const {
        _id,
        name,
        phoneNo,
        myself,
        saveas,
        fulladdr,
        vehicle,
        vnumber,
    } = "";
    const flag = false;
    const searchAdrId = () => {
        payload.address.map((index) => {
            console.log(index);
            if (index._id === reqAdr) {
                _id = index._id;
                name = index.name;
                phoneNo = index.phoneNo;
                myself = index.myself;
                saveas = index.saveas;
                fulladdr = index.fulladdr;
                vehicle = index.vehicle;
                vnumber = index.vnumber;
                flag = true;
            }
        })
    }
    console.log("map check");
    searchAdrId();
    if (flag === false) {
        // could'nt find a addres please add a address
    }

    // check if already have some orders or not
    const orderDetails = await orderModel.findOne({ phoneNo: orderInfo.phoneNo });
    console.log({ orderDetails });
    let index = 0;
    if (orderDetails) {
        index = orderDetails.order.length;
    }
    // condition for first time orders
    if (index === 0) {
        let newOrder = new orderModel({
            "phoneNo": orderInfo.phoneNo,
            "order": {
                "fuelType": orderInfo.order.fuelType,
                "fuelAmount": orderInfo.order.fuelAmount,
                "emergency": orderInfo.order.emergency,
                "Date": orderInfo.order.Date,
                "preferredTiming": orderInfo.order.preferredTiming,
                "CoupanId": orderInfo.order.CoupanId,
                "addressId": orderInfo.order.addressId,
                "status": orderInfo.order.status,
                "assignedTo": orderInfo.order.assignedTo,
                "assignTiming": orderInfo.order.assignTiming
            }
        });
        // save querry
        const result = await newOrder.save((err, result) => {
            if (err) {
                log.error(`Error in adding first order for phoneNo ${orderInfo.phoneNo}: ` + err);
                return res.status(500).send({
                    message: 'phoneNo ' + orderInfo.phoneNo + ' Error in saving first order.'
                });
            };
            log.info(result.phoneNo + ' has just ordered for the first time!');
            return res.status(200).send({
                message: 'You have ordered successfully.',
                phoneNo: result.phoneNo
            });
        });
        console.log("11");
        return result;
    }
    // condition for adding orders in to the array
    const check = orderDetails.order.push(orderInfo.order);
    console.log(check, "flagger");


    console.log({ payload });
    res.status(200).send({
        message: 'Testing phase'
    })
}

module.exports = {
    getAllOrdersDao,
    addOrderDao
}