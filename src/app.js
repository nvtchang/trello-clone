const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

//init middlewares
app.use(morgan("dev"))
app.use(helmet());
app.use(compression); //reduce size of metadata

//init db

//init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello';

    return res.status(200).json({
        message: 'WELCOME',
        metadata: strCompress.repeat(1000)
    })
})


//handling error

module.exports = app;