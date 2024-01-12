const express = require('express');
const {
    addCoupanController,
    getAllCoupansController
} = require('../controllers/coupan.controller')

const coupanRouter = express.Router();

coupanRouter.get('/getCoupans/:phoneNo', getAllCoupansController);//working
coupanRouter.post('/addCoupans', addCoupanController);//working
// edit order for status change assignment

module.exports = coupanRouter;