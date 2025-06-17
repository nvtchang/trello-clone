'use strict'

const mongoose = require('mongoose'); // Erase if already required
const COLLECTION_NAME = 'Board';
const DOCUMENT_NAME = 'Boards';

// Declare the Schema of the Mongo model
var boardSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, boardSchema);