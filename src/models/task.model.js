'use strict'
const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Task' //row in SQL
const COLLECTION_NAME = 'Tasks' //table in SQL
const slugify = require('slugify')

const taskSchema = new mongoose.Schema({
  title: String, //title: add database validation
  description: String,
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
  taskBoard: { type: mongoose.Schema.Types.ObjectId },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  taskSlug: String, //slug: add-database-validation
  dueDate: Date,
  order: Number,
  labels: [String],
  attachments: [String],
  type: {
    type: String,
    enum: ['Issue', 'Feature', 'Enhancement']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  isArchived: {
    type: Boolean,
    default: false,
    index: true
  },
  // isPublish: {
  //   type: Boolean,
  //   default: false,
  //   index: true,
  //   select: false //not show when query select
  // },
  createdAt: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//create index for search
taskSchema.index({title: 'text', description: 'text'})

//run before .save() .create()
taskSchema.pre('save', function(next) {
  this.taskSlug = slugify(this.title, {lower: true})
  next()
})

const issueSchema = new mongoose.Schema({
    evidence: String, // link ảnh hoặc video lỗi (s3)
    environment: String, // ví dụ: "Staging", "Production"
    stepsToReproduce: [String],
    expectedBehavior: String,
    actualBehavior: String
}, {
    collection: 'issues',
    timestamps: true
})

const featureSchema = new mongoose.Schema({
    businessGoal: String, // lý do ra tính năng này
    acceptanceCriteria: [String], // mô tả khi nào dev/test coi là "Done"
    mockupUrl: String
}, {
    collection: 'features',
    timestamps: true
})

const enhancementSchema = new mongoose.Schema({
    areaToImprove: String, // phần nào trong hệ thống được cải tiến
    currentLimitation: String,
    proposedImprovement: String,
    expectedImpact: String, // ví dụ: "giảm thời gian response từ 3s -> 1s"
}, {
    collection: 'enhancement',
    timestamps: true
})

module.exports = {
    task: mongoose.model('Task', taskSchema),
    issueTask: mongoose.model('Issue', issueSchema),
    featureTask: mongoose.model('Features', featureSchema),
    enhancementTask: mongoose.model('Enhancement', enhancementSchema),
}
