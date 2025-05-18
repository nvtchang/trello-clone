'use strict'

const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/trello_clone`
mongoose.connect(connectString).then( _ => console.log("Succeeded connect to MongoDB"))
.catch(err => console.log("Error connect!!!", err))

//dev
if(1 === 1) {
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})
}

module.exports = mongoose;

/*
- thiết lập 1 kết nối mới mỗi khi export modules dẫn đến nhiều kết nối được tạo ra tới 1 csdl, nhưng vì require đã cache lại nên khó xảy ra khi sử dụng node
*/