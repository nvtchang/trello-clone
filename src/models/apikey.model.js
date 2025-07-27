const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Apikey' //row in SQL
const COLLECTION_NAME = 'Apikeys' //table in SQL

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    require: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: [String],
    require: true,
    enum: ['0001', '0002', '0003']
  },
  userId : {
    type: String,
    require: true,
    ref: 'Users'
  }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema); //Compile the Schema into a Model.
