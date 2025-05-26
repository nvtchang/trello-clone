require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const router = require('./routes')
//init middlewares
app.use(morgan("dev"))
app.use(helmet());
app.use(compression()); //reduce size of metadata
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//init db
require('./dbs/init.mongodb')

//init routes
app.use('/', router);

//handling error

module.exports = app;