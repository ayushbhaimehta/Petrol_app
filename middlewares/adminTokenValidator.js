const jwt = require('jsonwebtoken');
// const { UserEmailModel } = require('../models/user.schemaModel');
const { DriverModel } = require('../models/driverSchema')
const bcrypt = require('bcrypt');

const secretKey = "123456789";

async function adminTokenValidator(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(403).send({
            message: 'Access denied authentication token not found'
        })
    }
    try {
        const payload = jwt.verify(token, secretKey);
        console.log({ payload });
        // const username = payload.username;
        const username = payload.username;
        const password = payload.password;


        // if (req.method === 'GET' && username !== req.params.username) {
        //     console.log("middleware check for validation");
        //     log.error(`username or phoneNo not matching with token`);
        //     return res.status(403).send({
        //         message: 'Validation error with token'
        //     })
        // }


        if (username !== req.body.username) {
            console.log("middleware check for validation");
            log.error(`username or phoneNo not matching with token`);
            return res.status(403).send({
                message: 'Validation error with token'
            })
        }
        const flag = await bcrypt.compare(password, req.body.password);
        if (!flag) {
            log.error(`password not matching with token`);
            return res.status(403).send({
                message: 'Validation error with token'
            })
        }
        await DriverModel.findOne(
            {
                username: username
            },
            async (err, response) => {
                if (err || !response) {
                    return res.status(403).send({
                        message: 'validation error with token'
                    })
                }
                const temp = await bcrypt.compare(password, response.password);
                if (!temp) {
                    return res.status(403).send({
                        message: 'validation error with token'
                    })
                }
                if (response.role !== 'ADMIN') {
                    return res.status(403).send({
                        message: 'validation error with token'
                    })
                }
            })
        next();
    } catch (err) {
        return res.status(403).send({
            message: 'Access denied invalid authentication token'
        });
    }
}

module.exports = {
    adminTokenValidator
}