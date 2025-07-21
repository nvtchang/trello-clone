'use strict'

const mongoose = require('mongoose'); // Erase if already required
const COLLECTION_NAME = 'Board';
const DOCUMENT_NAME = 'Boards';

// Declare the Schema of the Mongo model
const boardSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, boardSchema);
