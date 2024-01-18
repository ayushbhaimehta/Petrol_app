const express = require('express');
const {
    orderCountController
} = require('../controllers/dbCollection.controller');
// const { adminTokenValidator } = require('../middlewares/adminTokenValidator.js');


const dbCollectionRouter = express.Router();

dbCollectionRouter.get('/slotsAvailable', orderCountController);

module.exports = dbCollectionRouter;