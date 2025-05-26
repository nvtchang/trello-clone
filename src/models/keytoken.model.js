const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Key' //row in SQL
const COLLECTION_NAME = 'Keys' //table in SQL

const keyTokenSchema = new mongoose.Schema({
  user: {
    type: Object,
    require: true,
    ref: 'User'
  },
  publicKey: String,
  refreshToken: {type: Array, default: []}, //detect user sử dụng trái phép token
  createdAt: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema); //Compile the Schema into a Model.
