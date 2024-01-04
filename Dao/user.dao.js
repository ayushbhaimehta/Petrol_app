const mongoose = require('mongoose');
// const userSchema = require('');
// const UserModel = mongoose.model('User', userSchema);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const dbUrl = config.get('mongodb-config.protocol') + config.get('mongodb-config.host') + config.get('mongodb-config.port') + config.get('mongodb-config.db');
mongoose.connect(dbUrl, {})
    .then(log.info('connected to mongo database....'))
    .catch(err => log.error('unable to connect, please check your connection....' + err));

//I have included this for dev puprose wil remember to comment it out before testing and final deployment
mongoose.connection.dropCollection('users', err => { if (err) log.error('Unable to drop user collections: ' + err) });
