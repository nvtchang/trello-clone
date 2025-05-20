'use strict'

const mongoose = require('mongoose'); // Erase if already required
const COLLECTION_NAME = 'trello_clone';

// Declare the Schema of the Mongo model
var boardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength: 150
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model('User', userSchema);