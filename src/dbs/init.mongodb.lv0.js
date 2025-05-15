'use strict'

const mongoose = require('mongoose');

const connectString = ``
mongoose.connect(connectString).then( _ => console.log("Succeeded connect to MongoDB"))
.catch(err => console.log("Error connect!!!"))

//dev
if(1 === 0) {
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})
}

module.exports = mongoose;