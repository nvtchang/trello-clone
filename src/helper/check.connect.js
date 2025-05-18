'use strict'

const mongoose = require('mongoose')
const os = require('os');
const process = require('process');
const _SECONDS = 5000

//count Connect
const countConnect = () => {
    const numConnection = mongoose.connect.length;
    console.log(`Number of connections: ${numConnection}`);
}

//check overload connect
const checkOverload = () => {
    setInterval(() => {
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const numConnection = mongoose.connect.length;

        console.log(`Memory Usage ${memoryUsage}`);
        // ví dụ số lượng của connection sẽ dựa vào num cores
        const maxConnection = numCores * 5;

        if(numConnection > maxConnection) {
            console.log("Connection overload");
            //notify.send(...)
        }
    }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
};