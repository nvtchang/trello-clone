const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Key' //row in SQL
const COLLECTION_NAME = 'Keys' //table in SQL

const keyTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    ref: 'User'
  },
  publicKey: String,
  privateKey: String,
  refreshTokensUsed: {type: Array, default: []}, //những RT đã được sử dụng
  refreshToken: { //đang sử dụng
    type: String,
    require: true
  },
  createdAt: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema); //Compile the Schema into a Model.
