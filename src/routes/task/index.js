'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()

//create Task
router.post('/create', asyncHandler(taskController.createTask))

//archive Task
router.patch('/archive/:id', asyncHandler(taskController.archiveTask))

module.exports = router;
