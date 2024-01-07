const jwt = require('jsonwebtoken');

const secretKey = "123456789";

function authTokenValidator(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(403).send({
            message: 'Access denied authentication token not found'
        })
    }
    try {
        const payload = jwt.verify(token, secretKey);
        console.log({ payload });
        next();
    } catch (err) {
        return res.status(403).send({
            message: 'Access denied invalid authentication token'
        });
    }
}

module.exports = {
    authTokenValidator
}