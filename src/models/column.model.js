const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Column' //row in SQL
const COLLECTION_NAME = 'Columns' //table in SQL

const columnSchema = new mongoose.Schema({
  title: String,
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  order: {
    type: Number,
    require: true
  }, //ex: 1: todo => 2. in progress => 3. done
  createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = mongoose.model(DOCUMENT_NAME, columnSchema);
