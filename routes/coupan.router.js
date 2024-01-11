const express = require('express');
const {
    addCoupanController
} = require('../controllers/coupan.controller')

const coupanRouter = express.Router();

// orderRouter.get('/getOrders/:phoneNo', getAllOrdersController,);//working
coupanRouter.post('/addCoupans', addCoupanController);//working
// edit order for status change assignment

module.exports = coupanRouter;