/**
 * sử dụng Singleton chỉ kết nối 1 lần khi phương thức getInstance được gọi lần đầu
 * các kết nối sau sẽ trả về phiên bản hiện có trong mongoose
 */

'use strict'

const mongoose = require('mongoose');
const { db : {host, port, dbName}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${dbName}`
const { countConnect } = require('../helper/check.connect')

class Database {
    constructor() {
        this.connect()
    }

    //connect
    connect(type = 'mongodb') {
        if(1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }
        
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then( _ => console.log("Succeeded connect to MongoDB", connectString))
        .catch(err => console.log("Error connect!!!", err))
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
