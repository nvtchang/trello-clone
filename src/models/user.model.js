const { findLastKey } = require('lodash');
const mongoose = require('mongoose');
const DOCUMENT_NAME = 'User' //row in SQL
const COLLECTION_NAME = 'Users' //table in SQL

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: { type: String, unique: true },
  //avatarUrl: String,
  passwordHash: {
    type: String, 
    require: true,
    select: false
  },
  role: {
    type: [String],
    require: true,
    enum: ['admin', 'user', 'guest']
  },
  createdAt: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, userSchema); //Compile the Schema into a Model.
