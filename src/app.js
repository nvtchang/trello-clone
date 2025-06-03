require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const router = require('./routes')
//
const cookieParser = require('cookie-parser');

//init middlewares
app.use(morgan("dev"))
app.use(helmet());
app.use(compression()); //reduce size of metadata
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());

//init db
require('./dbs/init.mongodb')

//init routes
app.use('/', router);

//handling error

app.use((req, res, next) => { 
    const error = new Error('Not Found')
    error.status = 404
    next(error) // chuyển lỗi xuống middleware xử lý lỗi
})

app.use((error ,req, res, next) => { //ham xu ly loi
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;
